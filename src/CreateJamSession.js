import axios from "axios";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./CreateJamSession.css";
import cities from "./cities";

const initialData = {
  name: "",
  city: "",
  createdBy: "",
  members: [],
  genres: [],
  description: "",
  experience: "",
  instruments: [],
  street: "",
  plz: "",
  date: "",
};

const instruments = [
  {
    label: "electric guitar",
    value: "electric guitar",
  },
  {
    label: "drums",
    value: "drums",
  },
  {
    label: "bass guitar",
    value: "bass guitar",
  },
  {
    label: "7-string guitar",
    value: "7-string guitar",
  },
  {
    label: "keyboard",
    value: "keyboard",
  },
  {
    label: "violin",
    value: "violin",
  },
  {
    label: "flute",
    value: "flute",
  },
  {
    label: "bagpipe",
    value: "bagpipe",
  },
  {
    label: "saxophone",
    value: "saxophone",
  },
  {
    label: "talharpa",
    value: "talharpa",
  },
];
export {instruments}
export default function CreateJamSession({ options, users, me }) {
  const url = "https://jam-sessions-backend.herokuapp.com/jamsessions";
  const [data, setData] = useState(initialData);
  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        name: data.name,
        city: data.city,
        createdBy: me[0].data._id,
        members: data.members,
        genres: data.genres,
        description: data.description,
        experience: data.experience,
        instruments: data.instruments,
        street: data.street,
        plz: data.plz,
        date: data.date,
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
  }

  function handle(e) {
    const { name, value } = e.target;
    const newData = {
      ...data,
      [name]: value,
    };
    setData(newData);
    console.log(newData);
    console.log(e.target);
  }

  function handleArray(name, value) {
    const newData = {
      ...data,
      [name]: value,
    };

    setData(newData);
  }

  return (
    <div className="createjamsession">
      <h1>Create a new jam session</h1>
      <form onSubmit={submit}>
        <input
          className="sessionForm"
          onChange={handle}
          name="name"
          id="name"
          placeholder="name"
          type="text"
        ></input>
      
        <input
          className="sessionForm"
          onChange={handle}
          name="street"
          placeholder="Street/House Nr."
          type="text"
        ></input>
        <input
        className="sessionForm"
        onChange={handle}
        name="plz"
        placeholder="PLZ"
        type="text"></input>
        <select onChange={handle} name="city" className="select">
          <option className="city" selected>
            Choose City
          </option>
          {cities.map((city) => (
            <option className="city">{city.name}</option>
          ))}
        </select>
        
        <MultiSelect
          options={options}
          value={data.genres}
          onChange={(value) => handleArray("genres", value)}
          labelledBy="Select"
        />
       
        <textarea
          className="sessionForm"
          onChange={handle}
          name="description"
          id="description"
          placeholder="description"
          type="text"
          rows="50"
          cols="40"
        ></textarea>
        <select
          class="select"
          onChange={handle}
          name="experience"
          id="experience"
          placeholder="experience"
        > <option selected>choose your level</option>
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
        <MultiSelect
          options={instruments}
          onChange={handleArray}
          value={data.instruments}
          onChange={(value) => handleArray("instruments", value)}
        />
      
        <input
          className="sessionForm"
          onChange={handle}
          id="date"
          name="date"
          placeholder="date"
          type="date"
        ></input>
        <button className="select">Create Session</button>
      </form>
    </div>
  );
}
