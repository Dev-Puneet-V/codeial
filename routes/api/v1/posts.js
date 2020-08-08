const express = require('express');

const router = express.Router();


const postsApi = require('../../../controllers/api/v1/post-api');
router.get('/', postsApi.index);

module.exports = router;


//http://localhost:8000/api/v1/posts => go to this url to see the basic api