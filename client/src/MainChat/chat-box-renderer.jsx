import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "../emoji";

const ChatBoxRenderer = ({ value }) => {
  const {
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
  } = value;

  const [emojiClick, setEmojiClick] = React.useState(false);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Diagonal</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map(renderMessages)}
        </ScrollToBottom>
      </div>

      <div className="chat-footer-container">
        <div className="chat-footer">
          <div className="chat-icons">
            <i
              id="bold"
              className="fa-solid fa-b"
              onClick={bold ? addBold : removeBold}
            ></i>
            <i
              id="italic"
              className="fa-solid fa-italic"
              onClick={italic ? addItalic : removeItalic}
            ></i>
            <i
              id="strike"
              className="fa-solid fa-strikethrough"
              onClick={strike ? addStrike : removeStrike}
            ></i>
            |<i className="fa-solid fa-link"></i>|
            <i className="fa-solid fa-list-ol"></i>
            <i className="fa-solid fa-list-ul"></i>|
            <i className="fas fa-quote-left"></i>|
            <i className="fa-solid fa-code"></i>
            <i className="fa-solid fa-terminal"></i>
          </div>
          <div className="chat-input">
            <textarea
              type="text"
              value={currentMessage}
              id="innerText"
              autoFocus
              placeholder="Chat comes here..."
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyDown={(event) => {
                event.shiftKey && event.key === "Enter" && sendMessage();
              }}
            />
          </div>
          <div className="chat-buttons">
            <div className="leftSide-Buttons">
              <label htmlFor="files">
                <i className="fa-solid fa-circle-plus"></i>
              </label>
              <input
                type="file"
                id="files"
                style={{ display: "none" }}
                onChange={(event) => selectFile(event)}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              | &nbsp;
              <i
                className="fa-regular fa-face-smile"
                onClick={() => setEmojiClick(true)}
                onDoubleClick={() => setEmojiClick(false)}
              >
                {emojiClick ? (
                  <EmojiPicker
                    setEmojiClick={setEmojiClick}
                    setCurrentMessage={setCurrentMessage}
                    currentMessage={currentMessage}
                  />
                ) : null}
              </i>
              &nbsp;<i className="fa-regular fa-at"></i>
            </div>
            <div className="send-button">
              <button className="submitButton" onClick={sendMessage}>
                <SendIcon style={{ fontSize: 16 }} className="buttonIcon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxRenderer;
