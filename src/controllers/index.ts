import expressAsyncHandler from "express-async-handler";
import User from '@models/user.schema';
import {invokeOperationError} from '@error/invokeOperationError'
import { IRequest } from "@type/request";
import  {Transporter} from '@providers/email'
const registerUser =expressAsyncHandler(async(req,res)=>{
    const {
        first_name,
        last_name,
        email,
        password
    } = req.body;
    let user ;
     user = await User.findOne({email_id:email});
     try{
    if(user!==null){
       invokeOperationError("errors.user.alreadyexists");
    }
    try{
        const username = await User.createUsername(email);
        const hash = await User.hashPassword(password);
        const user  = new User({
            username:username,
            password:hash,
            email_id:email,
            first_name:first_name,
            last_name:last_name
        });
       user.email_verification_code =await user.generateEmailVerificationCode();
       await user.sendSignupMail();
       user.save();
       const token =await user.login(password);
       res.status(200).json(token);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}catch(error){
    console.log(error);
res.status(400).json({message:error.message})
}
});
const login = expressAsyncHandler(async(req,res)=>{
    const {
        email,password
    } = req.body;
    let user ;
    user = await User.findOne({email_id:email});
    try{
        if(user===null){
            invokeOperationError("errors.user.notfound")
        }
       const token = await user.login(password);
       res.status(200).json(token);
    }
    catch(error){
        res.status(404).json({error:error.message});
    }
});

const verifyEmail = expressAsyncHandler(async(req:IRequest,res)=>{
    try{
    const {email,email_verification_code} = req.query;
    let user ;
    user = await User.findOne({email_id:email});
  
    if(!user){
        invokeOperationError("errors.invalid.email")
    }
    if(user.email_verified){
        invokeOperationError("errors.email.verification.alreadyverified")
    }
    if(user.email_verification_code===email_verification_code){
        user.email_verified = true;
        user.save();
        res.status(200).json({email_verified:true});
    }
    else{
        invokeOperationError("errors.email.verification.invalid");
    }
}
catch(error){
    res.status(500).send({error:error.message});
}
});

const getProfile = expressAsyncHandler(async(req:IRequest,res)=>{
    try{
    const username = req.user.username;
    const user = await User.findOne({username:username});
    
    if(!user){  
        invokeOperationError("errors.user.notfound");
    }
    res.status(200).json(user);
    }
    catch(error){
        res.status(404).json(error);
    }
});
export default{
    registerUser,
    login,
    verifyEmail,
    getProfile,
};