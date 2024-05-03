import express from 'express'
export default async function validatePasswords(req:express.Request, res:express.Response,next: express.NextFunction){
    const password:string = req.body.password;
    if(password.length<8){
        
        res.status(404).json({error:"password length must be greater than 8 characters"});
        return ;
    }
    if(!/[A-Z]/.test(password)){
        res.status(404).json({error:"password must be have at least one capital letter"});
        return ;
    }
    if(!/[a-z]/.test(password)){
        res.status(404).json({error:"password must be have at least one small  letter"});
        return ;
    }
    if(!/\d/.test(password)){
        res.status(404).json({error:"password must be have  at least one digit"});
        return ;
    }
    if(!/[^a-zA-Z0-9]/){
        res.status(404).json({error:"password must be have at least one special letter"});
        return;
    }
    next();
} 