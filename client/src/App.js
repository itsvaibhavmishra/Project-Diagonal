import './App.css';
import io from "socket.io-client";   // used to establish a connection with socket.io server

const socket = io.connect("http://localhost:3001");

function App() {
  return <div className="App">
    <h2>Diagonal</h2>
    <input type="text" placeholder='Username'/>    
    <input type="text" placeholder='Room ID'/>
    <button>Connect for Chat</button>

  </div>;
}

export default App;
