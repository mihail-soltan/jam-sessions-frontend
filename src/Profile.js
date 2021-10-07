import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UserSessions from "./UserSessions";
import axios from "axios";
export default function Profile({search}) {
  const myProfile = "https://jam-sessions-backend.herokuapp.com/api/users/me";
  const sessionAPI = "https://jam-sessions-backend.herokuapp.com/jamsessions/";

  const [me, setMe] = useState([]);
  const [mySessions, setMySessions] = useState([]);
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
      axios
      .get(sessionAPI, { })
      .then((res) => {
        setMySessions(res.data);
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
  console.log(me);
  return (
    <div className="profile">
      {me.length && mySessions.length ? (
        me.map((e) => (
          <>
          <div className="userData">
            <img src={e.data.avatar}></img>
            <h1>
              {e.data.firstName} {e.data.lastName}
            </h1>
            </div>
            <div className="userTabs">
            <Tabs>
              <TabList>
                <Tab style={{color:"#EC8D11"}}>My Sessions</Tab>
                <Tab style={{color:"#EC8D11"}}>Conversations</Tab>
              </TabList>

              <TabPanel>
               <UserSessions me={me} mySessions={mySessions}/>
              </TabPanel>
              <TabPanel>
              <UserSessions me={me} mySessions={mySessions}/>
              </TabPanel>
            </Tabs>
            </div>
          </>
        ))
      ) : (
        <h1>Access Denied</h1>
      )}
    </div>
  );
}
