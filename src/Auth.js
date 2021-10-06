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
  
  const { login, isLoggedIn } = useContext(AuthContext)
  const [ formData, handleChange ] = useFormData(initialFormData)

  isLoggedIn ?  <Redirect to="/profile"/> : <Redirect to="/login" />

  return (
      <div className="auth">
        <h1>Login</h1>
        <div>
          <input onChange={handleChange} className="loginform" type="text"  name="email" placeholder="email"></input>
          <input onChange={handleChange} className="loginform" type="password" name="password" minLength="8" required ></input>
          <button className="loginform" onClick={() => login(formData)}>
            Login
          </button>
         </div>
        <h5>You don't have an account? <Link to="/signup">Sign Up Here</Link> </h5>
      </div>
  );
}
