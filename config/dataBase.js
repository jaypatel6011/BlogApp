const mongoose = require("mongoose");
require("dotenv").config()

const dbConnect = async() => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DataBase Connect Successfully"))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
}

module.exports = dbConnect;