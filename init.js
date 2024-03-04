const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then((res)=>{
    console.log("conection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
};
let allChats = [
    {
        from:"neha",
        to:"priya",
        msg:"send your exam sheet",
        created_at:new Date(),
    },
    {
        from:"Rahul",
        to:"priya",
        msg:"What are you doing rightNow",
        created_at:new Date(),
    },
    {
        from:"RaM",
        to:"Ramesh",
        msg:"What do you want from me",
        created_at:new Date(),
    },
    {
        from:"Akash",
        to:"priya",
        msg:"Love you see you soon",
        created_at:new Date(),
    },
    {
        from:"Yadav ji ",
        to:"priya",
        msg:"Who is Akash Can you explain",
        created_at:new Date(),
    },
]

Chat.insertMany(allChats);