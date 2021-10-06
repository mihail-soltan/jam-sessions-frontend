import React, { createContext, useState } from 'react';
import cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'https://jam-sessions-backend.herokuapp.com/api/users';
const userToken = cookies.get('token');

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(userToken);
  const [error, setError] = useState(false);

  const isLoggedIn = () => {
    return authToken ? true : false;
  }

  // console.log(authToken)
  const setCookieOrError = (res) => {
    const { status, data } = res;
    if (status === 200) {
      const { token } = data;
      cookies.set("token", token);
      setAuthToken(token);
    } else {
      setError(true);
    } 
  }

  const login = ({ password, email }) => {
    axios
      .post(`${API_URL}/login`, { password, email })
      .then((res) => setCookieOrError(res))
      .catch((err) => setError(true))
  }
  
 

  const register = ({ username, password, email }) => {
    axios
      .post(`${API_URL}/register`, { username, password, email })
      .then((res) => setCookieOrError(res))
      .catch((err) => setError(true))
  };

  const logout = () => {
    cookies.remove('token');
    setAuthToken('');
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isLoggedIn,
        login,
        register,
        logout
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;