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

const genreOptions = [
  {
    label: "Rock",
    value: "rock",
  },
  {
    label: "Reggae",
    value: "reggae",
  },
  {
    label: "Funk",
    value: "funk",
  },
  {
    label: "Rap",
    value: "rap",
  },
  {
    label: "Jazz",
    value: "jazz",
  },
  {
    label: "Metal",
    value: "metal",
  },
];

export default function CreateJamSession({ options, users }) {
  const url = "https://jam-sessions-backend.herokuapp.com/jamsessions";
  const [data, setData] = useState(initialData);
   
  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        name: data.name,
        city: data.city,
        createdBy: data.createdBy,
        members: data.members,
        genres: data.genres,
        // genres: data.genres.map(({ _id }) => _id),
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
    // console.log(e.target);
    setData(newData);
  }

  function handleArray(name, value) {
    const newData = {
      ...data,
      [name]: value,
    };

    setData(newData);
  }
  // console.log(options)
  // console.log(options)
  console.log(data)
  return (
    <div class="createjamsession">
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
          name="createdBy"
          id="createdBy"
          placeholder="createdBy"
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
          options={users}
          value={data.members}
          onChange={(value) => handleArray("members", value)}
          labelledBy="Select"/>
        <MultiSelect
          options={options}
          value={data.genres}
          onChange={(value) => handleArray("genres", value)}
          labelledBy="Select"
        />
        {/* <input type="checkbox" onChange={handle} name="genres" value="Metal" />
        <label for="genres"> Metal</label>

        <br /> */}
        {/* <input type="checkbox" onChange={handle} name="genres" value="Rock" />
        <label for="genres"> Rock </label>
        <br /> */}
        <input
          className="sessionForm"
          onChange={handle}
          name="description"
          id="description"
          placeholder="description"
          type="text"
        ></input>
        <select
          class="select"
          onChange={handle}
          name="experience"
          id="experience"
          placeholder="experience"
        >
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
        <select
          class="select"
          onChange={handleArray}
          name="instruments"
          id="instruments"
          placeholder="instruments"
          multiple
        >
          <option value="Electric Guitar">Electric Guitar</option>
          <option value="Bass Guitar">Bass Guitar</option>
          <option value="Drums">Drums</option>
          <option value="Vocals">Vocals</option>
          <option value="Keyboard">Keyboard</option>
        </select>
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
