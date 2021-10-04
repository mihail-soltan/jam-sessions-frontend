import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { instruments } from "./CreateJamSession";
export default function SignUp() {
  const userAPI = "https://jam-sessions-backend.herokuapp.com/api/users";

  const initialUserData = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      primaryContact: "",
      experience: "",
      instruments: [],
    };
  const [userData, setUserData] = useState(initialUserData);
  function registerUser(e) {
    e.preventDefault();
    axios
      .post(userAPI, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        primaryContact: userData.primaryContact,
        experience: userData.experience,
        instruments: userData.instruments,
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
      ...userData,
      [name]: value,
    };
    console.log(e.target);
    setUserData(newData);
  }
  function handleArray(name, value) {
    const newData = {
      ...userData,
      [name]: value,
    };

    setUserData(newData);
  }
  console.log(userData)
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={registerUser}>
        <input
          className="signupForm"
          type="text"
          required
          onChange={handle}
          name="firstName"
          placeholder="First Name"
        ></input>
        <input
          className="signupForm"
          type="text"
          required
          onChange={handle}
          name="lastName"
          placeholder="Last Name"
        ></input>
        <input
          className="signupForm"
          type="text"
          required
          onChange={handle}
          name="userName"
          placeholder="Username"
        ></input>
        <input
          className="signupForm"
          type="password"
          required
          onChange={handle}
          name="password"
          placeholder="password"
        ></input>
        <select
          className="signupForm"
          type="text"
          onChange={handle}
          name="primaryContact"
        >
            <option selected>Choose primary contact</option>
            <option>email</option>
            <option>phone</option>
        </select>
        <input
          className="signupForm"
          type="text"
          required
          name="email"
          onChange={handle}
          placeholder="Email"
        ></input>
        <select className="signupSelect" onChange={handle} name="experience" id="experience">
          <option selected>choose your level</option>
          <option> beginner </option>
          <option> intermediate </option>
          <option> advanced </option>
        </select>
        <MultiSelect
          value={userData.instruments}
          options={instruments}
          labelledBy="Select"
          onChange={(value) => handleArray("instruments", value)}
        />
        <button className="select">Sign Up</button>
      </form>
    </div>
  );
}
