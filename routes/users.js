const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
router.get('/sign-out', userController.destroySession);
router.post('/update/:id', userController.update);

//use passport as a middleware to authenticate
router.post('/create-session', 
passport.authenticate(
    'local',//strategy is local
    {failureRedirect: '/users/sign-in'}
) ,userController.createSession);

module.exports = router;