import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
module.exports = function(userSchema:mongoose.Schema){
userSchema.statics.createUsername = async function(email_id:string){
    const email_parts =email_id.split('@');
    let username ="";
    const alpha_numeric_only = email_parts[0].replace(/[^a-zA-Z0-9]/g, '');
    if (alpha_numeric_only.length > 5) {
        username += alpha_numeric_only.substring(0, 6);
    } else {
        username = alpha_numeric_only;
    }
    let random_number = Math.floor(Math.random() * 900000) + 100000;
    username += random_number;
    if (username[0] >= '0' && username[0] <= '9') username = 'user' + username;
    return username;
}

userSchema.statics.hashPassword = async function(password){
    const salt_round = 12;
    const hashPassword = await  bcrypt.hash(password,salt_round);
    return hashPassword;
}

}