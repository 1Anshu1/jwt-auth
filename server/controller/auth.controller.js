import User from '../model/user.model.js';
import emailValidator from 'email-validator'

// SIGNUP
export const signup = async (req, res, next) => {
    const {name, email, password, confirmPassword} = req.body

    if(!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'required data is missing'
        })
    }

    const validateEmail = emailValidator.validate(email);
    if(!validateEmail) {
        return res.status(400).json({
            success: false,
            message: 'invalid email'
        })
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'password does not match'
        })
    }

    try {
        const newUser = await User.create(req.body);
        const savedUser = await newUser.save();
        return res.status(200).json({
            success: true,
            savedUser
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
} 

// SIGNIN
export const signin = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'required data is missing'
        })
    }

    const user = await User.findOne({email}).select('+password')
    
    if(!user || user.password !== password) {
        return res.status(400).json({
            success: false,
            message: 'inavlid credentials'
        })
    }
    
    try {
        const token = user.jwtToken();
        user.password = undefined
    
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
    
        res.cookie("token", token, cookieOption);
    
        res.status(200).json({
            success: true,
            user
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
} 


export const userinfo = (req, res, next) => {
    
} 
