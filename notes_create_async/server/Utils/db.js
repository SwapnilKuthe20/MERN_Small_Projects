const mongoose = require('mongoose')

const Mongo_Url = process.env.MONGO_URL
mongoose.connect(Mongo_Url)
    .then(() => {
        console.log("Mongo_Url Connected !!");
    })
    .catch((err) => {
        console.log("Mongo_Url disconneted !??", err);
    })