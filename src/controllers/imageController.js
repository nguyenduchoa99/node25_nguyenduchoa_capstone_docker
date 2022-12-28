const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/reponse');

// Lấy thông tin User
const getUser = async (req, res) => {
    try {
        // Lấy thông tin email
        let { nguoi_dung_id } = req.params;
        let checkUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        });
        if (checkUser) {
            // Nếu có trả về successCode
            successCode(res, checkUser, 'Lấy dữ liệu thành công')
        }
        else {
            // Không có trả về failCode
            failCode(res, nguoi_dung_id, "Người dùng không tồn tại")
        }
    }
    catch (error) {
        // Lấy dữ liệu thất bại => Lỗi BackEnd
        errorCode(res, "Lỗi BackEnd")
    }
}

// Lấy danh sách ảnh đã tạo theo nguoi_dung_id
const getImgByIdUser = async (req, res) => {
    try {
        // Lấy thông tin của người dùng bằng id
        let { nguoi_dung_id } = req.params;
        let checkUserImg = await model.hinh_anh.findAll({
            where: {
                nguoi_dung_id
            }
        });
        if (checkUserImg != 0) {
            successCode(res, checkUserImg, "Lấy dữ liệu thành công");
        }
        else {
            failCode(res, nguoi_dung_id, "Người dùng chưa đăng ảnh hoặc không tồn tại");
        }
    }
    catch (error) {
        errorCode(res, "Lỗi BackEnd")
    }
}

// Lấy danh sách ảnh đã lưu theo nguoi_dung_id
const getImgSaveByIdUser = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params;
        let checkSaveImg = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id
            }
        });
        if (checkSaveImg != 0) {
            successCode(res, checkSaveImg, "Lấy dữ liệu thành công");
        }
        else {
            failCode(res, nguoi_dung_id, "Người dùng chưa có ảnh lưu hoặc không tồn tại");
        }
    }
    catch (error) {
        errorCode(res, "Lỗi BackEnd")
    }
}

// Xóa ảnh đã tạo theo id ảnh
const deleteImg = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        let checkIdImg = await model.hinh_anh.findOne({
            where: {
                hinh_id
            }
        })
        if (checkIdImg) {
            let checkFK1 = await model.luu_anh.findOne({
                where: {
                    hinh_id
                }
            })
            if (checkFK1) {
                let resuilt = await model.luu_anh.destroy({
                    where: {
                        hinh_id
                    }
                });
            }

            let checkFK2 = await model.binh_luan.findOne({
                where: {
                    hinh_id
                }
            })
            if (checkFK2) {
                let resuilt = await model.binh_luan.destroy({
                    where: {
                        hinh_id
                    }
                });
            }

            let resuilt = await model.hinh_anh.destroy({
                where: {
                    hinh_id
                }
            });
            successCode(res, resuilt, "Bạn đã xóa hình ảnh thành công !")
        }
        else {
            failCode(res, "Id ảnh bạn muốn xóa không tồn tại")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

module.exports = {
    getUser,
    getImgByIdUser,
    getImgSaveByIdUser,
    deleteImg
}