import "./FoundSessions.css";
import {useState} from 'react'


export default function FoundSessions({ search, setSearch }) {
    const [fullDate, setFullDate] = useState("")
    const date =(d) =>{
        setFullDate(new Date(d))
        
    }
    console.log(fullDate)
    console.log(search);
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
          );
        }
        
        date("2021-10-03T00:00:00.000Z")
  return (
    <div className="foundSessions">
      <h1>Hello World</h1>

      {search.length ? (
          search.map((session) => (
          <div className="sessionCard">
            <h3 key={uuidv4()}>{session.name}</h3>

            <h4 key={uuidv4()}>{session.city}</h4>
            <h5>{session.date}</h5>
          </div>
        ))
      ) : (
        <h1>LMAO</h1>
      )}
    </div>
  );
}
