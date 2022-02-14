const jwt = require('jsonwebtoken');
const validator = require('validator');
const {User} = require('../models');
const config = require('../config/config');
const { sendMail } = require("../services/email");


function jwtResetPassword (user) {
    return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: '15m' })
  }

module.exports = {
    
    
    sendResetLink: async (req, res, next) => {
          try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
    
            if (!email) {
              return res.status(400).send({ error: 'Email is required' });
            }
    
            if (!validator.isEmail(email)) {
                return res.status(400).send({ error: 'Invalid email' });
            }
    
            if (!user) {
              return res.status(404).send({ error: 'User not found' });
            }
            const token = jwtResetPassword(user.toJSON());

            const link = `${req.protocol}://localhost:8080/resetPassword/${token}`;
            const MsgContent = `Here is your reset password link: ${link}`;
  

            sendMail(email, MsgContent)
                .then(() => {
                }).catch((emailErr) => {
                    console.error(emailErr);
                    return res.status(400).send({ emailErr: 'The email provided is invalid' });
                });
        
            return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
    
          } catch (e) {
            return next(new Error(e));
          }
        },
        
    resetPassword: async (req, res, next) => {
          try {
            const { password, password2, token } = req.body;

            if(!password || !password2){
              return res.status(400).send({ error: 'Please insert a password.' });
            }
            const decoded = jwt.verify(token, config.authentication.jwtSecret);
            const id = decoded.id;
            // const hash = hashPassword(password);

            if (!validator.equals(password, password2)) {
                return res.status(400).send({ error: 'Password and Confirm Password must be the same' });
            }

            const user = await User.findOne({ where: { id } });

            await user.update({ password: password });

            return res.status(200).send({message: "it worked"});
          } catch (e) {
            return next(new Error(e));
          }
        }
}
