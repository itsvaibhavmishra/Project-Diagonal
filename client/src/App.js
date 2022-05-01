import './App.css';
import io from "socket.io-client";   // used to establish a connection with socket.io server
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {

    if (username !== "" && room !== "") {   // user cannot join if any of the field is empty
      socket.emit("join_room", room);  // "join_room" is event where room is passed as data to main.js
      setShowChat(true);
    }
  };

  return (
    <div className="App">
    {/* seperating chat menu from login page */}
    {!showChat ? (
        <div className='joinChatContainer'>
          <h2>Diagonal</h2>
          <input type="text" placeholder='Username' onChange = {(event) => {setUsername(event.target.value);}}/>    
          <input type="text" placeholder='Room ID' onChange = {(event) => {setRoom(event.target.value);}}/>
          <button onClick={joinRoom}>Connect for Chat</button>
        </div>
      ) : (
      <Chat socket={socket} username={username} room={room} /> 
    )}
  </div>
  );
}

export default App;
