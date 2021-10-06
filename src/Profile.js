import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
export default function Profile() {
  const myProfile = "https://jam-sessions-backend.herokuapp.com/api/users/me";
  const [me, setMe] = useState([]);
  const { authToken } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(myProfile, { headers: { Authorization: `Bearer ${authToken}` } })
      .then((res) => {
        setMe([res.data]);
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
  }, []);
  console.log(me)
  return (
      
    <div className="profile">
        {me.length ? ( me.map((e)=>
            <>
      <img src={e.data.avatar}></img>
      <h1>{e.data.firstName} {e.data.lastName}</h1>
      </>))
    :<h1>Access Denied</h1>
    }
    </div>
  );
}
