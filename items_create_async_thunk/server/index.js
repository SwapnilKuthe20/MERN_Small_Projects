const express = require("express")
require('dotenv').config()
require('./Utils/db')

const app = express()
const cors = require('cors')
const itemRouter = require("./Routes/ItemRoutes")

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/items', itemRouter)

app.get('/test', (req, res) => {
    res.send("This is test routes")
})

const Port = process.env.PORT || 3001
app.listen(Port, () => {
    console.log(`Server runs on Port :${Port}`);
})

