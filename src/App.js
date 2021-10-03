import "./App.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Switch, Route } from "react-router-dom";
import DatePicker from "react-date-picker";
import Menu from "./Menu";
import axios from "axios";
import cities from "./cities";
import CreateJamSession from "./CreateJamSession";
import Auth from "./Auth";
import SignUp from "./SignUp";
import FoundSessions from "./FoundSessions";
import SessionPage from "./SessionPage";
const genreAPI = "https://jam-sessions-backend.herokuapp.com/genres";
const userAPI = "https://jam-sessions-backend.herokuapp.com/api/users/"
const jamSessionAPI = "https://jam-sessions-backend.herokuapp.com/jamsessions/";

const initialData = {
  city: "",
  experience: "[]",
  genre: [],
  date: "",
};

function App() {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [fullDate, setFullDate] = useState(new Date());
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
    
  }, []);
  const searchSessions = (e) => {
    // console.log("Waddup biaatch?");
    setLoading(true)
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
  const dateTest = (e) =>{
    setFullDate(e.target.value)
  }
  // console.log(users)
  // console.log(fullDate)
  // console.log(search)
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/">
          <div className="App">
            <h1>Find a Jam Session</h1>
            <form className="form">
              <select className="select">
                <option className="city" selected>
                  Choose City
                </option>
                {cities.map((city) => (
                  <option className="city">{city.name}</option>
                ))}
              </select>
              <select className="select">
                <option selected>Choose your level</option>
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>
              {options ? (
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              ) : (
                <h1>"loading"</h1>
              )}
              <input type="date"
                onChange={dateTest}
                value={fullDate}
                className="datepicker"
              />
              <button className="select" onClick={searchSessions}>
                Search
              </button>
            </form>
          </div>
          <FoundSessions search={search} setSearch={setSearch} loading={loading}/>
        </Route>
        <Route path="/createsession">
          <CreateJamSession options={options} users={users} selected={selected} fullDate={fullDate} setSelected={setSelected}/>
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/jamsession/:id">
          <SessionPage loading={loading} search={search}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
