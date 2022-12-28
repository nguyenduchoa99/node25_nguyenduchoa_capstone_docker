const express = require('express');
const updateUserRoute = express.Router();
const {updateUser } = require('../controllers/userDetailController');
const { verifyToken } = require('../middlewares/baseToken');

// PUT người dùng

updateUserRoute.put("/updateUser/:nguoi_dung_id",verifyToken,updateUser);

module.exports = updateUserRoute;