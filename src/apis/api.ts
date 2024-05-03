import express from 'express';
import controller from '@controllers/index'
import loginMiddleware from 'src/middleware/loginMiddleware';
import validatePasswords from 'src/middleware/validatorPassword';
import validatorEmail from 'src/middleware/validatorEmail';
module.exports = function(api:express.Router){
      api.post('/register',validatorEmail,validatePasswords,controller.registerUser);
      api.get('/profile',loginMiddleware,controller.getProfile);
      api.post('/login',controller.login);
      api.get('/verify/email',controller.verifyEmail);
}