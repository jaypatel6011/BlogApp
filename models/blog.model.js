const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

    title:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    category:{
        type: String,
        default:"Undefine"
    },
    author:{
        type: String,
        required:true
    },
    authorPic:{
        type: String,
        default: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-1024.png"
    },
    published_date:{
        type: Date,
        default: Date.now()
    },
    content:{
        type: String,
        required:true
    },
    
})

module.exports = mongoose.model("Blog", blogSchema);

/*
    {
        "id": 1,
        "title": "Unitary AI picks up $15M for its multimodal approach to video content moderation",
        "image": "https://techcrunch.com/wp-content/uploads/2023/10/Screenshot-2023-10-03-at-01.44.37.png?w=430&h=230&crop=1",
        "category": "Health",
        "author": "Natasha Lomas",
        "authorPic": `${author}`,
        "published_date": "2023-10-01",
        "reading_time": "6 minutes",
        "content": "The Arc browser is “finally” launching its AI-powered features under the “Arc Max” moniker. The Browser Company is using a combination of OpenAI’s GPT-3.5 and Anthropi...",
        "tags": ["Startups", "Writing"]
    },
*/




