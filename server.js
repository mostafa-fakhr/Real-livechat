const express = require("express");
const path = require("path");

const app = express();
const server =require("http").createServer(app);

const PORT =process.env.PORT || 3000;
const io=require("socket.io")(server);


app.use(express.static(path.join(__dirname+"/public")))
app.get("/", (req, res) =>{
    res.render("index.ejs");
});

io.on("connection", function(socket) {
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username + "Joined the conversation");
    });

    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username + "Left the conversation");
    });

    socket.on("chat",function(message){
        socket.broadcast.emit("chat",message);
    });
});


server.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})
