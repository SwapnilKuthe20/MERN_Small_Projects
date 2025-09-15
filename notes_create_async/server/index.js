const express = require('express')
require('dotenv').config()
require('./Utils/db')
const app = express()

const cors = require('cors')
const notesRouter = require('./Routes/noteRoutes')

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    Credential: true
}))

// app.get("/test", (req, res) => {
//     res.send("Hello this this test route")
// })

app.use('/api/notes', notesRouter)

const Port = process.env.PORT || 5001
app.listen(Port, () => {
    console.log(`Server starts on POrt : ${Port}`);
})