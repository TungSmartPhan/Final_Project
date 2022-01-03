require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(cors())
app.use(fileupload({
    useTempFiles: true,
}))

app.use('/', (req, res,next) => {
    res.json({message: "Hello My Project"})
})


const PORT = process.env.PORT || 5000
app.listen(PORT,  () =>{
    console.log('Server is working on port ' , PORT)
})