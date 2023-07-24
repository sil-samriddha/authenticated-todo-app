const AuthModel = require('../Models/AuthModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secret_key = process.env.SALT


function Check (req, res, next) {
    if(req.cookies.login){
        let user = jwt.verify(req.cookies.login, secret_key);
        if(user){
            res.json({
                success: true,
                message: "Login successful",
                body: user
            });
        }
    }else{
        next();
    }
}

async function Signin(req, res) {
    if(req.body.email && req.body.password){
        try{
            let user = await AuthModel.findOne({email : req.body.email});
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)){
                let token = jwt.sign({payload : user['_id']}, secret_key);
                res.cookie('login', token)
                console.log("[Logged in]",  user['_id'].toString(), new Date());
                res.json({
                    success: true,
                    message : "Login successful",
                    body : user,
                    jwt : token
                })
            }else{
                res.json({
                    success : false,
                    message : "Wrong Password"
                })
            }
        }else{
            res.json({
                success : false,
                message : 'User not found'
            })

        }
        }
        catch (err) {
            res.json ({
                success : false,
                message : err.message
            })
        }
    }else{
        res.json({
            success : false,
            message : "empty field"
        })
    }
}

async function CreateUser(req, res) {
    try{
        let user = await AuthModel.create(req.body);
        console.log("[User Created] ",{
            cust_id :  user['_id'].toString(),
            name : user.name,
            email : user.email,
            hashed_password : user.password
        })
        console.log("OTP : ", user.otp, "->", user.email);
        res.json({
            success : true,
            message : "User created"
        });
    }catch(err){
        res.json({
            success : false,
            message : err.message
        })
    }
    
}

async function VerifyUser (req, res) {
    try{
        let user = await AuthModel.findOneAndUpdate({otp : req.body.otp}, {otp : ""});
        let token = jwt.sign({payload : user['_id']}, secret_key)
        res.cookie('login', token);
        console.log("[Logged in]", user['_id'].toString(), new Date());
        res.json({
            success: true,
            message : "Login successful",
            body : user,
            jwt : token
        })
    }catch(err){
        res.json({
            success: false,
            message : "Verification failed"
        })
    }
}
module.exports = {
    Check,
    Signin,
    CreateUser,
    VerifyUser
}