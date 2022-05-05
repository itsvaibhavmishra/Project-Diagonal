import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import LinkIcon from '@mui/icons-material/Link';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import AddIcon from '@mui/icons-material/Add';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

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
            <Button id="Bold" startIcon={<FormatBoldIcon/>} fontSize="small"></Button>
            <Button id="Italic" startIcon={<FormatItalicIcon/>} fontSize="small"></Button>
            <Button id="Strike" startIcon={<StrikethroughSIcon/>} fontSize="small"></Button>

            <Button id="Link" startIcon={<LinkIcon/>} fontSize="small"></Button>

            <Button id="numList" startIcon={<FormatListNumberedIcon/>} fontSize="small"></Button>
            <Button id="bulList" startIcon={<FormatListBulletedIcon/>} fontSize="small"></Button>

            <Button id="quote" startIcon={<AlignHorizontalLeftIcon/>} fontSize="small"></Button>
 
            <Button id="snippet" startIcon={<CodeIcon/>} fontSize="small"></Button>
            <Button id="block" startIcon={<TerminalIcon/>} fontSize="small"></Button>
          </div>

          <input id="chatInput" type="text" value={currentMsg} placeholder='Chat comes here...' onChange = {(event) => {setCurrentMsg(event.target.value);}} autoFocus onKeyPress={(event) => {event.key === "Enter" && sendMsg();}}/>
          
          <div className="additional">
            <Button id="file" startIcon={<AddIcon/>} fontSize="small"></Button>

            <Button id="emoji" startIcon={<SentimentSatisfiedAltOutlinedIcon/>} fontSize="small"></Button>
            <Button id="mention" startIcon={<AlternateEmailOutlinedIcon/>} fontSize="small"></Button>

            <Button onClick={sendMsg}  variant="contained" color="primary" startIcon={<SendIcon/>}></Button>
          </div>
        </div>
    </div>
  );
}

export default Chat