import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import "./SessionPage.css";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}


export default function SessionPage({ loading, search, newData, authToken, me }) {


  const jamSessionID = useParams();
  const filteredSession = search.filter(
    (session) => session._id === jamSessionID.id
  );
  console.log(jamSessionID);
  console.log(filteredSession);
  //   console.log(showSession);
  //   const body = marked(showSession.recipe || "");
  const [color, setColor] = useState("#F2AA4C");
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    console.log(me)
  // const participate = () => {
  //   filteredSession
  // }

  const participate = (e) => {
    console.log(e.target)
  }

  const [participateBtn, setParticipateBtn] = useState({
    className: 'participate-Disabled',
    disabled: true
})

console.log(participateBtn.className)
  useEffect(() =>{
    if(authToken){
      setParticipateBtn({
        className: 'participate-btn',
        disabled: false,
    })
    }
  }, [])

  return search ? (
    <>
      <div className="sessionPage">
        {filteredSession.map((s) => (
          <>
            {" "}
            {/* <h3>Created by {s.createdBy}</h3> */}
            <div className="sessionCard1">
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
              {authToken ? (
                <form>
                  <textarea
                    className="messageForm"
                    rows="4"
                    cols="50"
                    placeholder="Type your message"
                  />
                  <button className="sendMessagebtn">Send Message</button>
                  {/* <IoIosSend value={{ className: "react-icons" }} /> */}
                </form>
              ) : (
                <h1>Please sign in to send a message</h1>
              )}
              <div className="sessionDetails">
              <div className="sessionAddress">
                <h6 className="cardAddress" key={uuidv4()}>
                  {s.street}
                </h6>
                <h6 className="cardAddress" key={uuidv4()}>
                  {s.plz}
                </h6>
                </div>
                <div className="participants">
                <h6> Participants: {s.members.length}/4</h6>
                <button disabled={participateBtn.disabled}  onClick={participate} className={participateBtn.className}>Participate</button>
                </div>
              </div>
              <div className="cardBottom">
                <div className="genreLabels">
                  {s.genres.map((genre) => (
                    <div className="genre">
                      <h6 key={uuidv4()}>{genre.value + " "} </h6>
                    </div>
                  ))}
                </div>
                <div className="details">
                  <Link to="/">
                    <button class="glow-on-hover" type="button">
                      Go back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  ) : (
    <SyncLoader color={color} loading={loading} css={override} size={30} />
  );
}
