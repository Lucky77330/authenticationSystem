                                                  # Authentication System

# 1. Introduction :
                   This project is aimed at providing a RESTful API for user authentication and profile management.
                   
#2. Installation :
                   To get started with the project, follow these steps:
                   
              1. Clone the repository:
                   git clone https://github.com/syadav77330/wfwegff/master

              2. Install Node.js packages:
                   npm install
#3. Set up environment variables : 
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
  1. Register User
             Endpoint: api/register
             Method: POST
             Parameters:
                         first_name: User's first name.
                         last_name: User's last name.
                         email: User's email address.
                         password: User's password.
             Response: JSON response containing access token, refresh token, and verification code sent via email.
     
  3. User Login
             Endpoint: api/login
             Method: POST
             Parameters:
                 email: User's email address.
                 password: User's password.
            Response: JSON response containing access token and refresh token.
     
  4. Verify Email
           Endpoint: api/verify/email
           Method: GET
           Query Parameters:
                              email: User's email address.
                              email_verification_code: Verification code sent via email.
           Response: If successful, the email is verified, otherwise an error message is returned.
  5. Get User Profile
           Endpoint: api/profile/
           Method: GET
           Headers: Authorization header with access token.
           Response: JSON response containing user profile information.
