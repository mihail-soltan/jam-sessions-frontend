import { useParams } from "react-router-dom";
import { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import "./SessionPage.css";
import { Link } from "react-router-dom";
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default function UserSessions({ me, mySessions }) {
  const jamSessionID = useParams();
  const filteredSession = mySessions.filter(
    (session) => session.createdBy._id === me[0].data._id
  );
  //   const [showSession] = filteredSession;
  console.log(mySessions[12]);
  console.log(me);
  console.log(filteredSession)
  //   console.log(showSession);
  //   const body = marked(showSession.recipe || "");
  const [color, setColor] = useState("#F2AA4C");
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return mySessions ? (
    <>
      <div>
        {filteredSession.map((s) => (
          <>
            {" "}
            <div className="sessionCard">
              <div className="sessionTitle">
                {" "}
                <h3 key={uuidv4()}>
                  {s.name}, {s.city}
                </h3>
                <h5 key={uuidv4()}>
                  {new Date(s.date).toString().substring(0, 15)}
                </h5>
              </div>
              <div className="sessionMain">
                <h4 key={uuidv4()}>{s.description} </h4>
              </div>
              <h6 key={uuidv4()}>{s.street} </h6>
              <h6 key={uuidv4()}>{s.plz} </h6>
              <div className="cardBottom">
                <div className="genreLabels">
                  {s.genres.map((genre) => (
                    <div className="genre">
                      <h6 key={uuidv4()}>{genre.value + " "} </h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  ) : (
    <h1>Loading</h1> 
  );
}
