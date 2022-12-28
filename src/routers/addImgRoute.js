const express = require('express');
const addImgRoute = express.Router();
const { postImgByUser } = require('../controllers/addImgController');
const { verifyToken } = require('../middlewares/baseToken');


// POST ảnh của một user
addImgRoute.post('/postImg', verifyToken, postImgByUser);

module.exports = addImgRoute;