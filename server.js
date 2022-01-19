require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

//middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);
express.urlencoded({extended: true})

// Routers
app.use('/user', require('./routes/userRouter'))


//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }, error => {
    if(error) throw error;
    console.log('Connected to MongoDB!!!')
    });

app.use("/", (req, res, next) => {
  res.json({ message: "Hello My Project" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is working on port ", PORT);
});
