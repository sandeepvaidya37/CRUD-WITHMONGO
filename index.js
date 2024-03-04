const express= require("express");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main()
.then((res)=>{
    console.log("conection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
};

app.get("/", (req, res)=>{

    res.send("home Page");
});


app.get("/chats", async (req, res)=>{
   let chats= await Chat.find();
   res.render("index.ejs", {chats});
});
//new chat

app.get("/chats/new", async (req, res)=>{

    res.render("new.ejs");

})

app.post("/chats", (req, res)=>{

    let {from, msg, to}=req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    newChat.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });

    console.log(newChat);
    res.redirect("http://localhost:8080/chats");

});

app.get("/chats/:id/edit", async (req, res)=>{

    let {id}=req.params;
   let chat =await Chat.findById(id);
   

    res.render("edit.ejs", {chat});
});

app.put("/chats/:id", async (req, res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    let updatedChat =await Chat.findByIdAndUpdate(id, {msg:msg} ,{runValidaters: true, new:true });
    res.redirect("http://localhost:8080/chats");

});

app.delete("/chats/:id", async (req, res)=>{
    let {id}=req.params;
    let updatedChat =await Chat.findByIdAndDelete(id, {runValidaters: true, new:true });
    res.redirect("http://localhost:8080/chats");

});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});