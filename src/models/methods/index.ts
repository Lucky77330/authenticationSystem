import mongoose from "mongoose";
import bcrypt from "bcrypt";
import randomstring from 'randomstring'
import TokenService from '@providers/jsonwebtoken'
import {invokeOperationError} from "@error/invokeOperationError";
import {Transporter} from '@providers/email'
const tokenService =new TokenService();
 module.exports = function (userSchema:mongoose.Schema){
    userSchema.methods.getProfile = async function(){
      const user = {
        first_name:this.first_name,
        last_name:this.last_name,
        username:this.username,
        email_id:this.email_id,
        email_verified:this.email_verified
      }
      return user;
    }
   userSchema.methods.afterSaveAction =async function(){
   }
   userSchema.methods.generateEmailVerificationCode = async function () {
      const email_verification_code = randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });
      return email_verification_code;
    };
    userSchema.methods.login = async function(password:string){
      let user =this;
      const password_check =bcrypt.compareSync(password,user.password);
      if(password_check===false){
        invokeOperationError("errors.invalid.password");
      }
     const token = await tokenService.generateToken({
         first_name:user.first_name,
         last_name:user.last_name,
         email:user.email,
         username:user.username
      });
      return token
    }
    userSchema.methods.sendSignupMail = async function(){
      let user = this;
      const transporter = new Transporter();
     const response  = await transporter.mailTransporter({email:user.email_id,subject:"email verification",first_name:user.first_name,verification_code:user.email_verification_code});
      return  response;
    }

 }