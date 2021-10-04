import "./FoundSessions.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

export default function FoundSessions({ search, setSearch, loading, fullDate, data }) {

  const [color, setColor] = useState("#F2AA4C");
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  // console.log(fullDate)
  // console.log(search);
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  return (
    <div className="foundSessions">
      {search.length ? (
        search.filter((s) => s.date === data.date.toISOString() || s.city.includes(data.city) || JSON.stringify(s.genres) === JSON.stringify(data.genres) || s.experience === data.experience).map((session) => (
          <div className="sessionCard">
            <div className="sessionTitle">
              {" "}
              <h3 key={uuidv4()}>
                {session.name}, {session.city}
              </h3>
              <h5 key={uuidv4()}>
                {new Date(session.date).toString().substring(0, 15)}
              </h5>
              
            </div>
            <div className="sessionMain">
              <h4 key={uuidv4()}>{session.description} </h4>
            </div>
            <h6 key={uuidv4()}>{session.street} </h6>
            <h6 key={uuidv4()}>{session.plz} </h6>
            <div className="cardBottom">
              <div className="genreLabels">
              {session.genres.map((genre) => (
                <div className="genre">
                  <h6 key={uuidv4()}>{genre.value + " "} </h6>
                </div>
              ))}
              </div>
              <Link to={`/jamsession/${session._id}`}>
              <button class="glow-on-hover" type="button">
                See Event Details
              </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <SyncLoader color={color} loading={loading} css={override} size={30} />
      )}
    </div>
  );
}
