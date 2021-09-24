import axios from "axios";
import { useState } from "react";

const initialData = {
  name: "",
  createdBy: "",
  members: [],
  genres: [],
  description: "",
  experience: "",
  instruments: [],
  date: ""
}

export default function CreateJamSession() {
    const url="https://jam-sessions-backend.herokuapp.com/jamsessions"
    const [data, setData] = useState(initialData)
     function submit(e){
        e.preventDefault();
         axios.post(url,{
            name: data.name,
            createdBy: data.createdBy,
            members: data.members,
            genres: data.genres,
            description: data.description,
            experience: data.experience,
            instruments: data.instruments,
            date: data.date
        })
        .then(res=>{
            console.log(res.data)
        })
        
            .catch((error) => {
              if (error.response){
                  console.log(error.response)
                
                }else if(error.request){
                  console.log(error.request)
                
                }else if(error.message){
                  console.log(error.message)
                
                }
            })
       
    }
    function handle(e){
      const {name, value} = e.target
        const newData = {
          ...data,
          [name]: value,
        }
        setData(newData)
        console.log(data)
    }
    function handleArray(e){
      const { name, options } = e.target;
      const selectedOptions = [...options]
        .filter((option) => option.selected)
        .map((selected) => selected.value);

      const newData = {
        ...data,
        [name]: selectedOptions
      };

    setData(newData);
    console.log(data);
  }
  return(
    <div>
      <form onSubmit={submit}>
        <input onChange={handle} name="name" id="name"  placeholder="name" type="text"></input>
        <input onChange={handle} name="createdBy" id="createdBy"  placeholder="createdBy" type="text"></input>
        <select onChange={handleArray} name="members" id="genres" placeholder="genres" multiple>
          <option value="614afbadbdd597f983d9bc06">John Doe</option>
          <option value="614afdb544449579b8528bc9">Carpenter</option>
        </select>
        <select onChange={handleArray} name="genres" id="genres" placeholder="genres" multiple>
        <option value="Metal"> Metal </option>
        <option value="Rock"> Rock </option>
        <option value="Reggae"> Reggae </option>
        <option value="Funk"> Funk </option>
        <option value="Rap"> Rap </option>
        <option value="Jazz"> Jazz </option>
        </select>
        <input onChange={handle} name="description"id="description" placeholder="description" type="text"></input>
        <select onChange={handle} name="experience" id="experience" placeholder="experience">
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
        <select onChange={handleArray} name="instruments" id="instruments" placeholder="instruments" multiple>
          <option value="Electric Guitar">Electric Guitar</option>
          <option value="Bass Guitar">Bass Guitar</option>
          <option value="Drums">Drums</option>
          <option value="Vocals">Vocals</option>
          <option value="Keyboard">Keyboard</option>
        </select>
        <input onChange={handle} id="date" name="date"placeholder="date" type="date"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
