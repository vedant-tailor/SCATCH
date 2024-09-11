const bcrypt = require("bcrypt")
const userModel = require('../models/user-model')
const { generateToken } = require("../utils/generateToken")


module.exports.registerUser = async function (req,res){
    try {
        let {fullname, email, password} = req.body
        let user = await userModel.findOne({email})
        if (user) return res.status(401).send("This account already created please login")
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                if(err) return res.send(err.message)
                else{
                    
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.send("Success!!!")                    
                }
            })
        })

    } catch (error) {
        res.send(error.message)
    }
}

module.exports.loginUser = async function (req,res){
    let {email, password} = req.body

    let user = await userModel.findOne({email:email}) 
    if (!user) return res.send("email or password incorrect")
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = generateToken(user)
            res.cookie("token",token)
            res.redirect('/shop')
        }
        else{
            req.flash("error:","email or password incorrect")
            return res.redirect("/")
        }
    })
}