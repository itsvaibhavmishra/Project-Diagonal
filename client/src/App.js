import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import ChatBoxContainer from "./MainChat/chat-box-container";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Diagonal</h3> 
          <input
            type="text"
            autoFocus
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatBoxContainer username={username} room={room} socket={socket} />
      )}
    </div>
  );
}

export default App;
