const mongoose = require('mongoose')

const Mongo_Url = process.env.MONGO_URL
// console.log(Mongo_Url, "...mongoUrl");

mongoose.connect(Mongo_Url)
    .then(() => {
        console.log("MongoDB Connected !!");
    })
    .catch((err) => {
        console.log("MongoDB Disconnected ??", err);

    })