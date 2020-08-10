const express = require('express');
const passport = require('passport');
const router = express.Router();


const postsApi = require('../../../controllers/api/v1/post-api');
router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);//goes into passport-jwt-strategy.js for authentication
//If in post man we get unauthorized 401 then that means the token which was generated does not matched the credentials
module.exports = router;


//http://localhost:8000/api/v1/posts => go to this url to see the basic api