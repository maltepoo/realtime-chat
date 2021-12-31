import React, { useEffect, useState } from "react";
import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:4000');

const Chatlogs = () => {
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    socket.on('revmessage', (msg) => {
      setMessages((message) => [...message, msg])
      // console.log(msg)
    })
  }, [])

  return (
    <div>
      {messages.map((msg, idx) => (
        <div key={idx}>
          <div>{msg.userName}</div>
          <div>{msg.message}</div>
          <div>{msg.time}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Chatlogs;