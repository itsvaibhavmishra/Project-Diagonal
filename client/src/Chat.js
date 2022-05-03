import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket, username, room}) {   // socket, username and room are taken from App.js Line 29
  const [currentMsg, setCurrentMsg] = useState("");  // keeps track of chat input field
  const [msgList, setmsgList] = useState([]);
  
  const sendMsg = async () => {

    if (currentMsg !== "") {
      const msgData = {
        room: room,
        user: username,
        msg: currentMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),  // timestamp
      };
      await socket.emit("send_message", msgData);
      setmsgList((list) => [...list, msgData]);
      setCurrentMsg("");
    };
  };
  
  useEffect(() => {
    
    socket.on("receive_message", (data) => {
      setmsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="c-window">
        <div className="c-header">
            <p id="Head">Diagonal</p>
            <p id='roomNo'>Room: {room}</p>
        </div>
        <div className="c-body">
          <ScrollToBottom className="msg-container">
            {msgList.map((msgContent) => {
              return (
              // Checking and changing message sent in chat from different users form current user
              <div className="msg" id={username === msgContent.user ? "current" : "other"}>
                <div className="msg-above">
                  <p id="userName">{msgContent.user}</p>
                </div>
                <div className="msg-content">
                  <h3>{msgContent.msg}</h3>
                </div>
                <div className="msg-below">
                  <p id="curTime">{msgContent.time}</p>
                </div>
              </div>
              )
            })}
          </ScrollToBottom>
        </div>
        <div className="c-footer">
          <div className="input-option">
            <button id="Bold"></button>
            <button id="Italic"></button>
            <button id="Strike"></button>
            
            <button id="Link"></button>

            <button id="numList"></button>
            <button id="bulList"></button>

            <button id="quote"></button>

            <button id="snippet"></button>
            <button id="block"></button>
          </div>

          <input type="text" value={currentMsg} placeholder='Chat comes here...' onChange = {(event) => {setCurrentMsg(event.target.value);}} autoFocus onKeyPress={(event) => {event.key === "Enter" && sendMsg();}}/>
          
          <div className="additional">
            <button id="file"></button>

            <button id="emoji"></button>
            <button id="mention"></button>

            <button id="sendKey" onClick={sendMsg}>&#9658;</button>
          </div>
        </div>
    </div>
  );
}

export default Chat