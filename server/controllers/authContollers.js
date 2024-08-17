const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req,res) =>{
    try {
        let {username,email,password} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(409).json({
                message:"User Already Present, Please Log in",
                success:false
            })
        }
        
        let userModel = new User({username,email,password})
         userModel.password = await bcrypt.hash(password,10)
         await userModel.save()
        
        return res.status(201).json({
            message:"Sign Up Successfully",
            success :true
        })
    
    } catch (error) {
        return res.status(400).json({
            message:"Internal Server Error",
            error
        })
    
    }
}


let login = async (req,res) =>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({email})
        let errMesg = "Auth failed ! Email or Password is Incorrect."
        if(!user){
            return res.status(409).json({
                message:errMesg,
                success:false
            })
        }
        
        let isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.status(409).json({
                message:errMesg,
                success:false
            })
        }

        const jwtToken = jwt.sign({
            email : user.email,
            _id : user._id
        },process.env.JWT_PRIVATE_KEY,{expiresIn:"24h"})

        return res.status(201).json({
            message:"Login Successfully",
            success :true,
            jwtToken,
            email,
            username : user.username
        })
    
    } catch (error) {
        return res.status(400).json({
            message:"Internal Server Error",
            error
        })
    
    }
}

module.exports = {
    signup,login
}