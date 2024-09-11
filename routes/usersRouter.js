const express = require('express')
const router = express.Router()
// const isloggedIn = require('../middlewares/isLoggedIn')
const { 
    registerUser,
    loginUser,
 } = require('../controllers/authController')

router.get(("/"),(req,res)=>{
    res.send("hey it's working!!")
})


router.post("/register", registerUser)
router.post("/login",  loginUser)

module.exports = router;