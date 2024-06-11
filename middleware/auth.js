const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) =>{
 try {
    const token = req.header("token")
    console.log(token)

    if(!token){
        res.json({
            success: true,
            message: "token Missing"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SCRETE)
    console.log("decode", decode)

    req.user = decode

    } catch (error) {
        res.json({
            success: false,
            message: "token rrrrr"
        })
    }
    next()
 } catch (error) {
    res.json({
        success: false,
        message: "internal error"
    })
 }
}


exports.isAdmin = (req, res, next) =>{

   try {
    console.log(req.user.role)
    if(req.user.role !== "Admin"){

        return res.json({
            success:false,
            message:"This is Protected Routes for admin"
        })
    }
    next()

   } catch (error) {
    res.json({
        success:false,
        message:"This is Protected Routes for admin ! internal error"
    })
   }

}