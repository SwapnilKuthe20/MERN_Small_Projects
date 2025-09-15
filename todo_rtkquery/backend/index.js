const express = require("express")
const app = express()
require('dotenv').config()

const port = process.env.PORT || "8080"

app.use((port) => {
    console.log(`Serever start on port : ${port}`);
})
