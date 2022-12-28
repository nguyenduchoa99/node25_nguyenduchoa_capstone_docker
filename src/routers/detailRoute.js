const express = require('express');
const detailRoute = express.Router();
const { getInfoImgById, getCommentById, createComment, getImgNotSave } = require('../controllers/detailController');
const { verifyToken } = require('../middlewares/baseToken');
// GET ảnh theo id ảnh và người dùng
detailRoute.get('/getInfoImgById/:hinh_id', verifyToken, getInfoImgById);

//GET bình luận theo id ảnh
detailRoute.get('/getCommentById/:hinh_id', verifyToken, getCommentById);

//POST bình luận
detailRoute.post('/createComment', verifyToken, createComment);

//GET hình ảnh đã lưu hay chưa theo id
detailRoute.get("/getImgNotSave/:hinh_id", verifyToken, getImgNotSave);

module.exports = detailRoute;