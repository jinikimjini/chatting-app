const express = require("express")
const http = require("http")
const app = express()
const path = require("path")
const server = http.createServer(app)
const socketIO = require("socket.io")//소켓
const moment = require("moment")

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000;//포트 번호를 5000으로 사용 하겠다.


io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{
        //채팅창에 쓴 데이터 가져옴 , 프론트에서 넘겨 받으너 데이터
        const {name, msg} = data;
        io.emit("chatting", {name: name,
             msg: msg,
            time: moment(new Date()).format("h:ss A")}) // 데이터 소켓으로 보냄, 넘겨줄 데이터
    })
})


server.listen("5000", console.log(`server is runing ${PORT}`))