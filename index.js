const express = require("express");
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io")(server, { cors: { origin:"http://localhost:3000"} });
const fs = require('fs');
const { json } = require("express");

app.use(express.json())

server.listen("4000",() => {
    console.log("Server Running on Port 4000...")
})

io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on("join_room", (data, user) => {
        socket.join(data,user)
        console.log(`${user} joined room ${data}`)
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data.content )
        console.log(data)
    })
    socket.on("disconnect", () => {
        console.log("USER DISCONNECT")
    })
})
