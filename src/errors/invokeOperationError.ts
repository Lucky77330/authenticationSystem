// import OperationError from './operation/operation_error'

 export const invokeOperationError = (code:string)=>{
const error ={
    error:code
}
 throw new OperationError(error);
}
 class OperationError extends Error{
    constructor(message:{error:string}){
        super(message.toString())
        this.message =message.error
        this.name ='OperationsError'
    }
}