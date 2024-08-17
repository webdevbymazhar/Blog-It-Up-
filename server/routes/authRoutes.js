const express = require("express")
const router = express.Router()
const { signup, login } = require("../controllers/authContollers")
const { signUpValidation, logInValidation } = require("../middlewares/authMiddlewares")




router.post("/register",signUpValidation,signup)


router.post("/login",logInValidation,login)

module.exports = router