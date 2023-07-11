const user = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const create = async(req,res)=>{
    const bodyData = req.body
    const {fullName,email,password} = bodyData
    if(!fullName){
        return res.status(400).send({status:false,message:"Full Name is mandatory"})
    }
    if(!email){
        return res.status(400).send({status:false,message:"email is mandatory"})
    }
    if(!password){
        return res.status(400).send({status:false,message:"password is mandatory"})
    }
    const emailCheck = await user.findOne({ email: email })
    if (emailCheck) {
        return res.status(400).send({ status: false, message: "This email is already Registered." })
}
    bodyData.password = await bcrypt.hash(password, 10)
    
    let data = await user.create(bodyData)
    let name = data.fullName
    res.status(200).send({status:true, message:`Welcome ${name}`})
}

const login = async(req,res)=>{
    try{
    const body = req.body
    const {email,password} = body
    if(!email){
        return res.status(400).send({status:false,message:"email is mandatory"})
    }
    if(!password){
        return res.status(400).send({status:false,message:"password is mandatory"})
    }

    const emailCheck = await user.findOne({ email: email })
        if (!emailCheck) {
            return res.status(400).send({ status: false, message: "This email is not Registered." })
}
    const passwordCheck = await bcrypt.compare (password,emailCheck.password)
    if(!passwordCheck) {
        return res.status(401).send({ status: false, message: "Password is incorrect" })
    }

    const userId = emailCheck._id
        const token = jwt.sign({ userId: userId.toString() }, "xyz@123", { expiresIn: "24h" })

        const data = {
            userId: userId,
            token: token
        }

    res.status(200).send({status:true, data:data, message: "Login Succesfull"})
}catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}

module.exports = { create, login}