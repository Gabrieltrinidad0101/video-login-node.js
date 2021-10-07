const {Schema,model} = require("mongoose")

const authSchema = new Schema({
    userName: String,
    email: String,
    password: String
})

module.exports = model("auth",authSchema)
