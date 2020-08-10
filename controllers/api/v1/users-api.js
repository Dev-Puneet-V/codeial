const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//sign in and create a session for user
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in Successful, here is your token, please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(), 'codeial',{expiresIn:'100000'})//encrypts, check in postman, The encrypted part will be having three parts header, payload and signature differentiated by dot
                //body -> x-www... -> put key and password
            }
        })
    }catch(err){
        console.log('*****', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
} 