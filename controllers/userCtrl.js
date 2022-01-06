const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {CLIENT_URL} = process.env

const userCtrl = {
    register:  async (req, res) => {
        try {
            const {name, email, password} = req.body;

            if(!name || !email || !password){
                return res.status(400).json({message:"Please fill in all fields."})
            }

            if(!validateEmail(email)){
                return res.status(400).json({message:"This email is unavailable. !!!"})
            }

            const user = await User.findOne({email})
            if(user) {
                return res.status(400).json({message:"This email is already exists. !!!"})
            }

            if(password.length < 6 )
            { 
                return res.status(400).json({message:"Password must be at least 6 characters"})
            }

            const passwordHash = await bcrypt.hash(password,12)
            
            const newUser = {
                name , email, password: passwordHash
            }
            
            const activation_token = createActivaitonsToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email,url)

            res.json({ message:"Register  Successfully, Please Activate your account before starting ^_^"})
        } catch (error) {
            return res.status(500).json({ message: error.message})
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivaitonsToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}



const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl