const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const { Sequelize } = require('sequelize');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/reponse');
const Op = Sequelize.Op;


// Lấy danh sách ảnh 
const getListImg = async (req, res) => {
    try {
        let data = await model.hinh_anh.findAll();
        // Lấy dữ liệu thành công
        successCode(res, data, "Lấy dữ liệu thành công");
    }
    catch (error) {
        // Lấy dữ liệu thất bại => lỗi BackEnd
        errorCode(res, "Lỗi BackEnd");
    }
};

// Lấy danh sách ảnh theo tên ( tìm kiếm )
const getSearchImg = async (req, res) => {
    try {
        // lấy ký tự ở params tìm kiếm
        let { ten_hinh } = req.params;
        // tìm kiếm ký tự đó trong toàn bộ ảnh
        let checkImg = await model.hinh_anh.findAll({
            where: {
                ten_hinh: {
                    [Op.like]: `${ten_hinh}%`
                }
            }
        });
        if (checkImg.length != 0) {
            // nếu có trả về thành công
            successCode(res, checkImg, "Lấy dữ liệu thành công");
        } else {
            // nếu không có trả về không tìm thấy
            failCode(res, ten_hinh, "Không tìm thấy hình ảnh");

        }
    }
    catch (error) {
        // Lấy dữ liệu thất bại => Lỗi BackEnd
        errorCode(res, "Lỗi BackEnd");
    }
}
module.exports = {
    getListImg,
    getSearchImg
}