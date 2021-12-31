const cors = require("cors");

const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const PORT = 4000
const app = express();
const server = http.createServer(app)


app.use(cors());

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});


io.on('connection', socket => {
	console.log('SEVER : 연결되었습니다')

	socket.on('join', (user) => {
		console.log(`${user}님이 입장하셨습니다`)
		io.emit('joined', user);
	})

	socket.on('sendmessage', (msg) => {
		console.log(msg)
		io.emit('revmessage', msg);
	})

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(PORT,()=> console.log(`서버가 http://localhost:${PORT} 에서 시작되었어요`))