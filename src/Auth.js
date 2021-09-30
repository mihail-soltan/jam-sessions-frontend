import { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
export default function Auth() {
  const submit = () => {
      console.log("hello lmao")
  };
  return (
      <div className="auth">
        <h1>HELLO WORLD LMAO</h1>
        <form>
          <input className="loginform" type="text" placeholder="login"></input>
          {/* <label for="pass">Password (8 characters minimum):</label> */}
          <input className="loginform" type="password" minLength="8" required ></input>
          <button role="button" className="loginform" onClick={submit}>
            Login
          </button>
        </form>
        <h5>You don't have an account? <Link to="/signup">Sign Up Here</Link> </h5>
      </div>
  );
}
