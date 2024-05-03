                                                  # Authentication System

# 1. Introduction:
  This project is aimed at providing a RESTful API for user authentication and profile management.
                   
# 2.  Installation:
   To get started with the project, follow these steps:
                   
 ## 1. Clone the repository :
                 git clone https://github.com/Lucky77330/authenticationSystem.git
  
##  2. Install Node.js packages :
                                   npm install
## 3. Set up environment variables : 
                               `PORT`: Port number for the server to run on.
                               `MONGODB_URI`: MongoDB connection URI.
                               `MONGODB_CONFIG`: Configuration for MongoDB (local, AWS, Atlas, etc.).
                               `SENDER_EMAIL`: Sender email address for sending verification codes.
                               `SENDER_EMAIL_PASSWORD`: Password for the sender email address.
                               `SENDER_EMAIL_PORT`: Port for the email server.
                               `SENDER_EMAIL_HOST`: Host for the email server.

#4. Usage : 
            Once the environment variables are set up, you can start the server using:
         
                 npm start

#5.  API Endpoints :-
  ## 1. Register User
             Endpoint: api/register
             Method: POST
             body Parameters in json: 
                         first_name: User's first name.
                         last_name: User's last name.
                         email: User's email address.
                         password: User's password.  // password atleast 8 digit and atleast one small latter , one capital latter and one 
                                                     // special latter are required 
            
             Response: JSON response containing access token, refresh token, and verification code sent via email.
     
  ## 3. User Login
             Endpoint: api/login
             Method: POST
             body Parameters in json :
                 email: User's email address.
                 password: User's password.
            Response: JSON response containing access token and refresh token.
     
  ## 4. Verify Email
           Endpoint: api/verify/email
           Method: GET
           Query Parameters:
                              email: User's email address.
                              email_verification_code: Verification code sent via email.
           Response: If successful, the email is verified, otherwise an error message is returned.
  ## 5. Get User Profile
           Endpoint: api/profile/
           Method: GET
           Headers with Bearer Token: Authorization header with access token.
           Response: JSON response containing user profile information.
  
  # Example  => 
  
  ## Register User 
         url =>  https://authenticationsystem-gk0p.onrender.com/api/register 
         pass parameter in body
        {
         "first_name":"arvind",
         "last_name":"kumar",
         "email":"example@gmail.com",
         "password":"Password@123"
         }
 
## login => 
        https://authenticationsystem-gk0p.onrender.com/api/login
        pass parameter in body
       {
          "email":"example@gmail.com",
           "password":"Password@123"
       }

## getProfile => 
          https://authenticationsystem-gk0p.onrender.com/api/profile
          Authorization header :  bearer token <access token>  $which get from login endpoint 

## verifyEmail =>  
            URL:- https://authenticationsystem-gk0p.onrender.com/api/verify/email
            Query Params:-
            key   : value 
            email :example@gmail.com
            email_verification_code : code
            
            
 
