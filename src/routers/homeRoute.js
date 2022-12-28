const express = require('express');
const homeRoute = express.Router();
const { getListImg,getSearchImg } = require('../controllers/homeController');
const { verifyToken } = require('../middlewares/baseToken');

//GET danh sách ảnh
homeRoute.get('/getListImg', verifyToken, getListImg);
// GET danh sách ảnh theo tên tìm kiếm
homeRoute.get('/getSearchImg/:ten_hinh',verifyToken,getSearchImg);
module.exports = homeRoute;