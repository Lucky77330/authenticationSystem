import emailValidator from 'email-validator'
import express from 'express'
import {invokeOperationError} from '@error/invokeOperationError';
export default async function validatorEmail(req:express.Request,res:express.Response,next:express.NextFunction){
const {email} = req.body;
try{
if(emailValidator.validate(email)){
 next();
}
else{
    invokeOperationError("errors.invalid.email")
}
}
catch(error){
    res.status(400).json({error:"invalid email address"});
}
}