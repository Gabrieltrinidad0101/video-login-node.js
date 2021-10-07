const jwt = require("jsonwebtoken")
const KEY = require("../key");

const verify = async (req,res,next)=>{
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(401).json("do not have token");
        const verify = await jwt.verify(token,KEY);
        req.userId = verify.id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json("token is invalid")
    }
}

module.exports = verify