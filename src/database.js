const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Auth")
    .then(res => console.log("db connect"))
    .catch(error => console.log(error))