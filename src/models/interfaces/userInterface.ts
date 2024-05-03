import { Document ,Model } from "mongoose";
export interface IUserSchema extends Document{
    first_name:string;
    last_name:string;
    email_id:string;
    username:string;
    password:string;
    email_verification_code:string;
    email_verified:boolean;
    generateEmailVerificationCode():Promise<string>;
    afterSaveAction():void;
    login(password:string):Promise<object>;
    getProfile():Promise<object>;
    sendSignupMail():Promise<string>
}
export interface IUserSchemaModel extends Model<IUserSchema>{
    createUsername(email_id:string):string;
    hashPassword(password:string): Promise<string>;
    generateEmailVerificationCode():void;
    generateEmailVerificationCode():Promise<string>;
}