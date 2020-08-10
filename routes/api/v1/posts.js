const express = require('express');
const passport = require('passport');
const router = express.Router();


const postsApi = require('../../../controllers/api/v1/post-api');
router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);

module.exports = router;


//http://localhost:8000/api/v1/posts => go to this url to see the basic api