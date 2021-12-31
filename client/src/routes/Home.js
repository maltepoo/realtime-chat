import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:4000');

const temp = prompt("닉네임을 입력해주세요");

const Home = () => {
  const [nickname, setNickname] = useState(temp);
  
  useEffect(() => {
    setNickname(temp)
    socket.emit('join', temp);
  }, [])

  return (
    <div className="Home-container">
      <h1>안녕하세요! {nickname}님</h1>
      <label htmlFor="roomName">Room</label>
      <input name="roomName"></input>
      <button className="Join-button">
        {/* <Link to="/Chats">새로운 방 만들기</Link> */}
        <Link to="/Chats" state={{ userinfo: nickname }}>새로운 방 만들기</Link>
      </button>
      <button className="Join-button">
        <Link to="/Chats">채팅 참여하기</Link>
      </button>
    </div>
  );
};

export default Home;