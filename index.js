const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const dotenv = require('dotenv').config();
const authRoute=require("./routes/authRoute");
const app=express();

const port = process.env.PORT;
const uri = process.env.MONNGO_URI;

app.use(bodyParser.json());


app.use('/auth',authRoute)

mongoose.connect(uri).then(app.listen(port,()=>{console.log("server is running")}))
