const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.register = async (req, res) => {
    try {
        const { 
            name,
            email,
            password,
            password2,
            
        } = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        if(password.length < 8 ){
            return res.json({
                success:false,
                message:"Password length should be greter than 8"
            }) 
        }

        if(password !== password2 ){
            return res.json({
                success:false,
                message:"Password Don`t Matched"
            }) 
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            password2: hashPassword
        })

        return res.status(200).json({
            success:true,
            data:user,
            message:"Register successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"Internal Error"
        })

    }
}
exports.login = async (req, res) => {
    try {
        const { 
            email,
            password,
            
        } = req.body;

        if(!email || !password){
            return res.json({
                success:false,
                message:"Please fill all details"
            })
        }

        let existingUser = await User.findOne({email})
        console.log(existingUser);

        if(!existingUser){
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }

        if(! await bcrypt.compare(password, existingUser.password)){
            return res.json({
                success:false,
                message:"Invalid credentials",
            })  
        }

        const payload ={
            id : existingUser._id,
            role: existingUser.role,
        }

        const token = jwt.sign(payload, process.env.JWT_SCRETE, {
            expiresIn: "30d"
        })
        existingUser = existingUser.toObject()
        existingUser.token = token
        existingUser.password = undefined
        existingUser.password2 = undefined

        res.cookie("token", token, {
            httpOnly:true,
            expiresIn: "30d"
        })

        return res.status(200).json({
            success:true,
            data:existingUser,
            id: existingUser._id,
            role:existingUser.role,
            token,
            message:"Login successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"Internal Error"
        })

    }
}



exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            success:true,
            data:users,
            message:"fetched All User successfully"
        })
    } catch (error) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"fetched all Users internal error"
        })
    }
}


exports.getUserById = async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({_id : id})
        res.status(200).json({
            success:true,
            data:user,
            message:"fetched User successfully"
        })
    } catch (error) {
        console.error("error : ",error)
        res.status(500).json({
            success:false,
            message:"fetched Users internal error"
        })
    }
}

exports.updateUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const {name, email, password, newPassword} = req.body;
        const existingUser = await User.findOne({_id: id})
        console.log(existingUser)
        if(! await bcrypt.compare(password, existingUser.password)){
            return res.json({
                success:false,
                message: "Wrong Password"
            })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10)
        const user = await User.findByIdAndUpdate({_id: id},{name, email, password:hashPassword, password2:hashPassword})
        console.log(user)
        res.status(200).json({
            success:true,
            data:user,
            message:"Profile Update successfully"
        })
    } catch (error) {
        console.error("error : ", error)
        res.status(500).json({
            success:false,
            message:"Profile Update internal error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        await User.findByIdAndDelete({_id: id})

        res.status(200).json({
            success:true,
            message:"Delete user successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"Delete user internal error"
        })

    }
}