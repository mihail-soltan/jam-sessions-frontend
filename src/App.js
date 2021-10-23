import "./App.css";
import { useState, useEffect, useContext } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import axios from "axios";
import cities from "./cities";
import CreateJamSession from "./CreateJamSession";
import Auth from "./Auth";
import SignUp from "./SignUp";
import FoundSessions from "./FoundSessions";
import SessionPage from "./SessionPage";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import Tickets from "./Tickets";
import { AuthContext } from "./AuthContext";
import UserSessions from "./UserSessions";
import { IconContext } from "react-icons";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaTwitch } from "react-icons/fa";
import { BsReddit } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
const genreAPI = "https://jam-sessions-backend.herokuapp.com/genres";
const userAPI = "https://jam-sessions-backend.herokuapp.com/api/users/";
const jamSessionAPI = "https://jam-sessions-backend.herokuapp.com/jamsessions/";
const ticketAPI = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=DE&apikey=${process.env.REACT_APP_TICKET_API}`;
const myProfile = "https://jam-sessions-backend.herokuapp.com/api/users/me";
const initialData = {
  city: "",
  experience: "[]",
  genres: [],
  date: "",
};

function App() {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  let [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [fullDate, setFullDate] = useState(new Date());
  const [me, setMe] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    axios.get(genreAPI).then(
      (response) => {
        setOptions(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    axios.get(userAPI).then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    axios.get(ticketAPI).then(
      (response) => {
        setTickets([response.data]);
      },
      (error) => {
        console.log(error);
      }
    );
    axios
      .get(myProfile, { headers: { Authorization: `Bearer ${authToken}` } })
      .then((res) => {
        setMe([res.data]);
      })

      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }
      });
  }, []);

  const searchSessions = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .get(jamSessionAPI)
      .then((res) => {
        setSearch(res.data);
      })

      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }
      });
  };

  function handleDate(e) {
    const { name, value } = e.target;
    const newData = {
      ...data,
      [name]: new Date(value),
    };
    console.log(e.target);
    setData(newData);
  }
  function handle(e) {
    const { name, value } = e.target;
    const newData = {
      ...data,
      [name]: value,
    };
    console.log(e.target);
    setData(newData);
  }
  function handleArray(name, value) {
    const newData = {
      ...data,
      [name]: value,
    };

    setData(newData);
  }

  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/">
          <div className="App">
            <form className="form">
              <h1 className="search">Search Sessions</h1>
              <select onChange={handle} name="city" className="searchCity" >
                <option defaultValue>
                  Choose City
                </option>
                {cities.map((city) => (
                  <option>{city.name}</option>
                ))}
              </select>
              <select onChange={handle} className="searchExp" name="experience" >
                <option defaultValue>Choose your level</option>
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>
              {options ? (
                <MultiSelect
                  options={options}
                  value={data.genres}
                  onChange={(value) => handleArray("genres", value)}
                  labelledBy="Select"
                />
              ) : (
                <h1>"loading"</h1>
              )}
              <input
                type="date"
                onChange={handleDate}
                name="date"
                id="date"
                className="datepicker"
              />
              <button className="select" onClick={searchSessions}>
                Search
              </button>
            </form>
            <FoundSessions
              search={search}
              setSearch={setSearch}
              loading={loading}
              data={data}
            />
            <Tickets tickets={tickets} setTickets={setTickets} />
          </div>
        </Route>
        <Route path="/createsession">
          <CreateJamSession
            options={options}
            users={users}
            selected={selected}
            fullDate={fullDate}
            setSelected={setSelected}
            me={me}
          />
        </Route>
        <ProtectedRoute component={Profile} path="/profile" />
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/logout"></Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/jamsession/:id">
          <SessionPage loading={loading} search={search} />
        </Route>
        <Route path="/profile/sessions">
          <UserSessions loading={loading} search={search} />
        </Route>
      </Switch>
      <Footer>
        <div className="footer">
          <h5>Contact</h5>
          <div className="footerContact">
            <h6>Kurze Str. 10</h6>
            <h6>13585, Berlin</h6>
            <h6>Tel: +4915254051183</h6>
          </div>
        </div>
        <div className="follow">
          <h5>Follow Us:</h5>
          <div className="footerIcons">
            <AiFillTwitterSquare style={{ width: "2em", height: "2em", margin: "5px" }} />
            <FaTwitch style={{ width: "2em", height: "2em", margin: "5px" }} />
            <BsReddit style={{ width: "2em", height: "2em", margin: "5px" }} />
          </div>
        </div>
        <div className="footer">
          <h5>NEWSLETTER</h5>
            <form className="newsLetterForm">
              <input type="text" className="newsletter" placeholder="Enter Your Email"/>
              <IconContext.Provider value={{ className: 'react-icons' }}>
              <IoIosSend  value={{ className: 'react-icons' }}/>
              </IconContext.Provider>
            </form>
        </div>
      </Footer>
    </>
  );
}

export default App;
