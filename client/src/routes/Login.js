import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:4000');

const Login = () => {
  const [nickname, setNickname] = useState("");

  return (
    <div>
      <input placeholder="닉네임을 입력해주세요"/>
      <button><Link to="/Home">입력</Link></button>
    </div>
  );
};

export default Login;