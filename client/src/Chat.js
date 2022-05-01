import React from 'react'

function Chat({socket, username, room}) {   // socket, username and room are taken from App.js Line 29
  return (
    <div>
        <div className="c-header">
            <p>Room: {room}</p>
        </div>
        <div className="c-body"></div>
        <div className="c-footer">
            <input type="text" placeholder='Chat comes here...'/>
            <button>&#9658;</button>
        </div>
    </div>
  );
}

export default Chat