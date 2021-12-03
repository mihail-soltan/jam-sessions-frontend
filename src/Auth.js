import { useState, useContext } from "react";
import { AuthContext } from './AuthContext';
import { Link, Redirect } from "react-router-dom";
import useFormData from './useFormData';
import "./Auth.css";

const initialFormData = {
  email: '',
  password: ''
};

export default function Auth() {
  
  const { login, isLoggedIn, authToken } = useContext(AuthContext)
  const [ formData, handleChange ] = useFormData(initialFormData)

  if (isLoggedIn()) return <Redirect to="/profile"/> 

  return (
      <div className="auth">
        <h1>Login</h1>
        <div className="authInputs">
          <input onChange={handleChange} className="loginform" type="text"  name="email" placeholder="email"></input>
          <input onChange={handleChange} className="loginform" type="password" name="password" placeholder="password" minLength="8" required ></input>
          <button className="login"  onClick={() => login(formData)}>
            LOG IN
          </button>
         </div>
        <h5>You don't have an account? <Link to="/signup" style={{ color: "white"}}>Sign Up Here</Link> </h5>
      </div>
  );
}
