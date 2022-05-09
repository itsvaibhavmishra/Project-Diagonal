import React, { useState, useEffect } from "react";
import ChatBoxRenderer from "./chat-box-renderer";
import Image from "../image";

const ChatBoxContainer = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [file, setFile] = useState();

  const sendMessage = async () => {
    if (file) {
      if (currentMessage !== "") {
        const messageData = {
          type: "file",
          mimeType: file.type,
          fileName: file.name,
          body: file,
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        setFile();
      }
    } else {
      if (currentMessage !== "") {
        const messageData = {
          type: "text",
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(true);
  const [strike, setStrike] = useState(true);

  const addBold = () => {
    
    document.getElementById("innerText").classList.add("bold");
    document.getElementById("bold").classList.add("white-color");

    setBold(false);
  };

  const removeBold = () => {
    document.getElementById("innerText").classList.remove("bold");
    document.getElementById("bold").classList.remove("white-color");

    setBold(true);
  };
  const addItalic = () => {
    document.getElementById("innerText").classList.add("italic");
    document.getElementById("italic").classList.add("white-color");
    setItalic(false);
  };

  const removeItalic = () => {
    document.getElementById("innerText").classList.remove("italic");
    document.getElementById("italic").classList.remove("white-color");
    setItalic(true);
  };
  const addStrike = () => {
    document.getElementById("innerText").classList.add("strike");
    document.getElementById("strike").classList.add("white-color");
    setStrike(false);
  };

  const removeStrike = () => {
    document.getElementById("innerText").classList.remove("strike");
    document.getElementById("strike").classList.remove("white-color");
    setStrike(true);
  };

  const selectFile = (e) => {
    setCurrentMessage(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const renderMessages = (messageContent, index) => {
    if (messageContent.type === "file") {
      const blob = new Blob([messageContent.body], {
        type: messageContent.type,
      });
      return (
        <div
          className="message"
          id={username === messageContent.author ? "you" : "other"}
          key={index}
        >
          <div>
            <div
              className="message-content"
              style={{ background: "transparent" }}
            >
              <Image fileName={messageContent.fileName} blob={blob} />
            </div>
            <div className="message-meta">
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div
          className="message"
          id={username === messageContent.author ? "you" : "other"}
          key={index}
        >
          <div>
            <div className="message-content">
              <p>{messageContent.message}</p>
            </div>
            <div className="message-meta">
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>
            </div>
          </div>
        </div>
      );
  };

  const value = {
    messageList,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    bold,
    italic,
    strike,
    addBold,
    removeBold,
    addItalic,
    removeItalic,
    addStrike,
    removeStrike,
    selectFile,
    renderMessages,
    setBold,
  };

  return <ChatBoxRenderer value={value} />;
};

export default ChatBoxContainer;
