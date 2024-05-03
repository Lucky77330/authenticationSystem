import { NextFunction, Request ,Response} from "express";
export interface IRequest extends Request{
    user?: IUser;
}
export interface IResponse extends Response{

}
export interface IUser {
    username?:string;
    email?:string;
    first_name?:string;
    last_name?:string;
}
export interface INextFunction extends NextFunction{
    
}