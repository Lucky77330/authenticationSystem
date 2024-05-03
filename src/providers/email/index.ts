const nodemailer= require('nodemailer');
import {CONFIG} from '@helpers/constant';
import signupTemplate from './template/signup';
export class Transporter {
 constructor(){

 }
 async mailTransporter(payload:{text?:string,email:string,subject:string,verification_code?:string,first_name:string}){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:CONFIG.SENDER_EMAIL_HOST,
        port:CONFIG.SENDER_EMAIL_PORT,
        secure:false,
        auth: {
            user: CONFIG.SENDER_EMAIL,
            pass: CONFIG.SENDER_EMAIL_APP_PASSWORD
        }
    });
    const mailOptions = {
        from: CONFIG.SENDER_EMAIL,
        to: payload.email,
        subject: payload.subject,
        html:signupTemplate(payload.verification_code,payload.first_name)
    };
    const response  = await transporter.sendMail(mailOptions);
    return response;

 }
}