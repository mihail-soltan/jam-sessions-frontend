import axios from "axios";
import { useState } from "react";

export default function SendMessage() {
    const url="https://jam-sessions-backend.herokuapp.com/messages"
    const [data, setData] = useState({
        title: "",
        owner_id: "",
        group_id: "",
        content: ""
    })
    function submit(e){
        e.preventDefault();
        axios.post(url,{
            title: data.title,
            owner_id: data.owner_id,
            group_id: data.group_id,
            content: data.content
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    function handle(e){
        const newData={...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
  return(
    <div>
      <form onSubmit={(e)=> submit(e)}>
        <input onChange={(e) => handle(e)} id="title"value={data.title} placeholder="title" type="text"></input>
        <input onChange={(e) => handle(e)} id="owner_id"value={data.owner_id} placeholder="owner_id" type="text"></input>
        <input onChange={(e) => handle(e)} id="group_id"value={data.group_id} placeholder="group_id" type="text"></input>
        <input onChange={(e) => handle(e)} id="content"value={data.content} placeholder="content" type="text"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
