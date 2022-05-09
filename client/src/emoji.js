import React, { useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPicker = (props) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    props.setCurrentMessage(props.currentMessage + `${emojiObject.emoji}`);
  };

  return (
    <div className="emojiPicker">
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmojiPicker;
