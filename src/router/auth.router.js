const {Router} = require("express");
const Auth = require("../model/auth.model")
const jwt = require("jsonwebtoken")
const account = require("../middlewares/jwt")
const router = Router();
const KEY = require("../key");

router.post("/register", async (req,res)=>{
    try {
        const {userName,email,password,verifyPassword} = req.body;
        if(!(userName && email && password && verifyPassword))
            return res.status(400).json("fill in all parameters")
        
        const havesAccount = await Auth.findOne({
            email,password
        });

        if(havesAccount)
            return res.status(400).json("the user exists")
            

        if(password.length < 8)
            return res.status(400).json("the password need to be more than 8 characters")
        
        if(password !== verifyPassword)
            return res.status(400).json("the passwords are not the same")
        
        const newAuth = new Auth({
            userName,
            email,
            password: await Auth.encryptPassword(password)
        });

        
        await newAuth.save();
        const token = jwt.sign({id: newAuth._id},KEY)
        return res.status(200).json({
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("Error");
    }
});

router.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    if(!(email && password))
        return res.status(400).json("fill in all parameters")
    
    const user = await Auth.findOne({email: email});
    
    if(!user)
        return res.status(400).json("the user no exists");

    const macth = await Auth.comparePassword(password,user.password)
    
    if(!macth)
        return res.status(400).json("the user no exists");
    
    const token = jwt.sign({id: user._id},KEY);
    res.status(200).json({token});
});

router.get("/account",account, async (req,res)=>{
    const user = await Auth.find({_id:req.userId},{password: 0});
    return res.status(200).json(user)
});


module.exports = router