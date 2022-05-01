import './App.css';
import io from "socket.io-client";   // used to establish a connection with socket.io server
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {

    if (username !== "" && room !== "") {   // user cannot join if any of the field is empty
      socket.emit("join_room", room);  // "join_room" is event where room is passed as data to main.js
    }
  };

  return (
    <div className="App">
    <h2>Diagonal</h2>
    {/* tracking changes on username and room id */}
    <input type="text" placeholder='Username' onChange = {(event) => {setUsername(event.target.value);}}/>    
    <input type="text" placeholder='Room ID' onChange = {(event) => {setRoom(event.target.value);}}/>
    {/* joinRoom function is used for onlick event */}
    <button onClick={joinRoom}>Connect for Chat</button>

  </div>
  );
}

export default App;
