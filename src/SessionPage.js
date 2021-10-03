import { useParams } from "react-router-dom";
import { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import marked from "marked";

export default function SessionPage({ loading, search }) {
  console.log(search);
  const jamSessionID = useParams();
  const filteredSession = search.filter((session) => session._id === jamSessionID.id);
//   const [showSession] = filteredSession;
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
  return search ? (
    <>
      <h1>Hello</h1>
    </>
  ) : (
    <SyncLoader color={color} loading={loading} css={override} size={30} />
  );
}
