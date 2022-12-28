const express = require('express');
const imageRoute = express.Router();
const { getUser ,getImgByIdUser,getImgSaveByIdUser,deleteImg} = require('../controllers/imageController');
const { verifyToken } = require('../middlewares/baseToken');

//GET thông tin người dùng
imageRoute.get('/getUser/:nguoi_dung_id',verifyToken,getUser);

//GET danh sách ảnh người dùng đã tạo
imageRoute.get('/getImgByIdUser/:nguoi_dung_id',verifyToken,getImgByIdUser);

//GET danh sách ảnh đã lưu theo người dùng
imageRoute.get('/getSaveImgByIdUser/:nguoi_dung_id',verifyToken,getImgSaveByIdUser);

//DELETE ảnh đã tạo theo id ảnh
imageRoute.delete('/deleteImgById/:hinh_id',verifyToken,deleteImg);

module.exports = imageRoute;
