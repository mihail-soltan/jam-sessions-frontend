import "./App.css";
import { useState, useEffect, useContext } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
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
import { AuthContext } from './AuthContext';
import UserSessions from "./UserSessions";

const genreAPI = "https://jam-sessions-backend.herokuapp.com/genres";
const userAPI = "https://jam-sessions-backend.herokuapp.com/api/users/";
const jamSessionAPI = "https://jam-sessions-backend.herokuapp.com/jamsessions/";
const ticketAPI =
  `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=DE&apikey=${process.env.REACT_APP_TICKET_API}`;
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
      .get(jamSessionAPI, {
        // params: {
        //   _id: "614e19ec4e5d36f9261217fb",
        // },
      })
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
  // console.log(data);

  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/">
          <div className="App">
            <form className="form">
              <h1>Search Sessions</h1>
              <select onChange={handle} name="city" className="select">
                <option className="city" defaultValue>
                  Choose City
                </option>
                {cities.map((city) => (
                  <option className="city">{city.name}</option>
                  ))}
              </select>
              <select onChange={handle} name="experience" className="select">
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
          <div className="results">
            
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
    </>
  );
}

export default App;
