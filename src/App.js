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
const genreAPI = "https://jam-sessions-backend.herokuapp.com/genres";
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
  const [search, setSearch] = useState({});
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    axios.get(genreAPI).then(
      (response) => {
        setOptions(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  const searchSessions = (e) => {
    console.log("Waddup biaatch?");
    e.preventDefault();
    axios
      .get(jamSessionAPI, {
        params: {
          _id: "614e19ec4e5d36f9261217fb",
        },
      })
      .then((res) => {
        console.log(res.data);
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
              <DatePicker
                onChange={onChange}
                value={value}
                className="datepicker"
              />
              <button className="select" onClick={searchSessions}>
                Search
              </button>
            </form>
          </div>
        </Route>
        <Route path="/createsession">
          <CreateJamSession options={options} selected={selected} setSelected={setSelected}/>
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/auth">
          <SignUp />
        </Route>
      </Switch>
    </>
  );
}

export default App;
