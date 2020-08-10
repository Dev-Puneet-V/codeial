const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;//helps to extract jwt from header

const User = require('../models/user');

//encryption and decryption
let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}


//router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);
//the below code matches this user id with the token which is generated
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    await User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        //checking if the user is there or not
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;