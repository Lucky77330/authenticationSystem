import mongoose from 'mongoose';
import { IUserSchema,IUserSchemaModel } from './interfaces/userInterface';
const user = new mongoose.Schema<IUserSchema>({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        index:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email_verification_code:{
        type:String,
        required:false
    },
    email_verified:{
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps:true,

});

require('./methods')(user);
require('./statics')(user);
user.post('save',async function(){
    await this.afterSaveAction();
});
const  User = mongoose.model<IUserSchema,IUserSchemaModel>("User",user);
export default User;