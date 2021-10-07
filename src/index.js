const express = require("express");
const morgan = require("morgan");
const auth = require("./router/auth.router");
const app = express();

//Data base
require("./database")

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/",auth);

app.listen(3000,_=>{
    console.log("start server");
});