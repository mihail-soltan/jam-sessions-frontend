import './SignUp.css'
import { MultiSelect } from 'react-multi-select-component';
import { useState } from 'react';
export default function SignUp() {
    const [selectedGenres, setSelectedGenres] = useState([])
    const options = [
        { label: "Electric guitar", value: "Electric guitar" },
        { label: "Drums", value: "Drums" },
        { label: "Bass guitar", value: "Bass guitar"},
        { label: "Vocals", value: "Vocals"},
        { label: "Keyboard", value: "Keyboard"},
      ];
      
  return <div className="signup">
      <h1>Sign Up</h1>
      <form>
          <input className="signupForm"type="text" required placeholder="First Name"></input>
          <input className="signupForm"type="text" required placeholder="Last Name"></input>
          <input className="signupForm"type="text" required placeholder="Username"></input>
          <input className="signupForm"type="password" required placeholder="password"></input>
          <input className="signupForm"type="text" placeholder="Phone number"></input>
          <input className="signupForm"type="text" required placeholder="Email"></input>
          <select className="signupSelect" name="experience" id="experience">
              <option selected>choose your level</option>
              <option> beginner </option>
              <option> intermediate </option>
              <option> advanced </option>
          </select>
          <MultiSelect value={selectedGenres} options={options} labelledBy="Select" />
          <button className="select">Sign Up</button>
      </form>
  </div>;
}
