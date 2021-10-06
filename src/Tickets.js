import "./FoundSessions.css";
import SyncLoader from "react-spinners/SyncLoader";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

export default function Tickets({ tickets }) {
  return (
    <div className="ticketCard">
      {tickets.length ? (
        tickets[0]._embedded.events.map((e) => (
            <>
          <div>
            <h3 style={{width: "220px", margin: "5px"}}>{e.name}, {e._embedded.venues[0].city.name}</h3>
            <img src={e.images[0].url} style={{ width: "220px", margin: "5px" }}></img>{" "}
          </div>
          <a href={e.url} target="_blank">
           <button class="glow-on-hover" type="button">
           Buy Tickets
         </button>
         </a>
        </>
        ))
      ) : (
        <h1>NOT LMAO</h1>
      )}
    </div>
  );
}
