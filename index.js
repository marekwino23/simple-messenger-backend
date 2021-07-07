const express = require("express");
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io")(server, { cors: { origin: '*'} });
const { json } = require("express");

const messages = [];

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
        messages.push(data);
        console.log("response: ", messages);
        io.in(data.room).emit("receive_message", messages );
    })
    socket.on("disconnect", () => {
        console.log("USER DISCONNECT")
    })
})
