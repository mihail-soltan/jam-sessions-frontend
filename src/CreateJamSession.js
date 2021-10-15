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
export { instruments };
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
        <h4>Give your session a distinctive title</h4>
        <input
          className="sessionForm name"
          onChange={handle}
          name="name"
          id="name"
          placeholder="Title"
          type="text"
        />
        <h4>Where do you want to jam?</h4>
        <select onChange={handle} name="city" className="sessionForm city">
          <option selected>Choose your city</option>
          {cities.map((city) => (
            <option>{city.name}</option>
          ))}
        </select>
        <div className="addressForm">
          <input
            className="sessionForm2 street"
            onChange={handle}
            name="street"
            placeholder="Street/House Nr."
            type="text"
          />
          <input
            className="sessionForm2 plz"
            onChange={handle}
            name="plz"
            placeholder="PLZ"
            type="text"
          />
        </div>
        <h4>What are your genre preferences?</h4>
        <MultiSelect
          options={options}
          value={data.genres}
          onChange={(value) => handleArray("genres", value)}
          labelledBy="Genres"
          className="sessionForm name"
        />

        <div>
          <h4>How much experience do you have?</h4>
          <select
            className="sessionForm city"
            onChange={handle}
            name="experience"
            id="experience"
          >
            {" "}
            <option selected>choose your level</option>
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </div>
        <h4>What instruments are you going to play?</h4>
        <MultiSelect
          options={instruments}
          onChange={handleArray}
          value={data.instruments}
          onChange={(value) => handleArray("instruments", value)}
          className="sessionForm name"
        />
        <h4>Is there anything else you would like to share?</h4>
        <textarea
          className="sessionForm name"
          onChange={handle}
          name="description"
          id="description"
          placeholder="description"
          type="text"
        />

        <div>
          <h4>Pick a date</h4>
          <input
            className="sessionForm name"
            onChange={handle}
            id="date"
            name="date"
            type="date"
          />
        </div>
        <button className="select">Create Session</button>
      </form>
    </div>
  );
}
