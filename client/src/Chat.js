import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {   // socket, username and room are taken from App.js Line 29
  const [currentMsg, setCurrentMsg] = useState("");  // keeps track of chat input field
  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room: room,
        user: username,
        msg: currentMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),  // timestamp
      };
      await socket.emit("send_message", msgData);
    };
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div>
        <div className="c-header">
            <p>Room: {room}</p>
        </div>
        <div className="c-body"></div>
        <div className="c-footer">
            <input type="text" placeholder='Chat comes here...' onChange = {(event) => {setCurrentMsg(event.target.value);}}/>
            <button onClick={sendMsg}>&#9658;</button>
        </div>
    </div>
  );
}

export default Chat