
const Joi = require("joi")

const signUpValidation = (req,res,next) =>{
    const schema = Joi.object({
        username : Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(399).json({
            message:"Bad Request",
            error
        })
    }
    next()
}

const logInValidation = (req,res,next) =>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(399).json({
            message:"Bad Request",
            error
        })
    }
    next()
}

module.exports = {
    signUpValidation,
    logInValidation
}