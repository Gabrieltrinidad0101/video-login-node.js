const {Schema,model} = require("mongoose");
const bcrypt = require("bcrypt");
const authSchema = new Schema({
    userName: String,
    email: String,
    password: String
});

authSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

authSchema.statics.comparePassword = async (password,receivePassword) =>{
    return await bcrypt.compare(password,receivePassword);
}


module.exports = model("auth",authSchema);