import { IRequest,IResponse ,INextFunction,IUser} from '@type/request';
import TokenService from '@providers/jsonwebtoken'
import {invokeOperationError} from '@error/invokeOperationError';
const tokenService = new TokenService();
export default async function loginMiddleware(req:IRequest,res:IResponse,next:INextFunction){
    let token =req.headers.authorization;
    try{
    if(!token){
        invokeOperationError("errors.access_token.notfound");
     
    }
    token =token.substring(7)
    const payload=(<IUser>await tokenService.verifyToken(token));
    if(!payload){
        invokeOperationError( "401:Unauthorized");
        return ;
    }
    req.user = {
        username:payload.username,
        first_name:payload.first_name,
        last_name:payload.last_name,
        email:payload.email
    };
    next();
}
catch(error){
res.status(404).json({message: error.message});
}
}