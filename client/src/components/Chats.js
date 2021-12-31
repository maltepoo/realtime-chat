import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
// import ReactDom from 'react-dom'
import socketio from 'socket.io-client';
import Chatlogs from "./Chatlogs";

const socket = socketio.connect('http://localhost:4000');


const Chats = () => {
  const location = useLocation()
  const { userinfo } = location.state

  const [currentSocket, setCurrentSocket] = useState();
  const [username, setUsername] = useState('Guest');
  const [chat, setChat] = useState('');

  useEffect(() => {
    setCurrentSocket(socketio("localhost:4000"));    
  }, []);

  useEffect(() => {
    setUsername(userinfo)
    socket.on('joined', (user) => {
      console.log(`${user}님이 입장하셨습니다`)
    });
  }, [userinfo])
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    currentSocket.emit('sendmessage', {
      userName: username,
      message: chat,
      time: new Date()
    });
    setChat("");
  }

  const handleChange = (e) => {
    setChat(e.target.value);
  }

  return (
    <div>
      <h1>Enjoy Chatting</h1>
      <h2>{username}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}
          value={chat}
          placeholder="메시지를 입력하세요"></input>
        <button>보내기</button>
      </form>
      <hr />
      <Chatlogs />
    </div>
  )
};

export default Chats;