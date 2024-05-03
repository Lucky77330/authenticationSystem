import jwt from 'jsonwebtoken'
import { CONFIG } from '@helpers/constant'
import fs from 'fs'
import { invokeOperationError } from '@error/invokeOperationError';
export default class TokenService {
    private secretKey:jwt.Secret;
    private accessOptions:Object;
    private refreshOptions:Object;
    constructor(){
        this.secretKey = fs.readFileSync('src/providers/jsonwebtoken/decrypted.pem');
        this.accessOptions = {
            expiresIn: '1h',
            algorithm: 'RS256'
        };
        this.refreshOptions = {
            expiresIn: '2h',
            algorithm: 'RS256'
        };
    }
    async generateToken(payload:{
        first_name:string,
        last_name:string,
        email:string,
        username:string
    }) {
        try{
            const userData = {
               first_name:payload.first_name,
               last_name:payload.last_name,
               email:payload.email,
               username:payload.username
            }
        const accessToken =  jwt.sign(payload, this.secretKey, this.accessOptions);
        const refreshToken = jwt.sign(payload, this.secretKey, this.refreshOptions);
        return {
            accessToken,
            refreshToken
        };
        }
        catch(err){
            console.log(err);
        }
    }
    async generateAccessTokenFromRefreshToken(refreshToken:string) {
        try{
        const payload =jwt.verify(refreshToken,this.secretKey);
        const accessToken = jwt.sign(payload, this.secretKey, this.accessOptions);
        return {
            accessToken,
            refreshToken
        };
    }
        catch(err){
            console.log(err.message);
        }
    }
    async verifyToken(token:string) {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded;
        } catch (err) {
            invokeOperationError("errors.access_token.expired.or.incorrect")
            
        }
    }
}
