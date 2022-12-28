const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/reponse');
const bcrypt = require('bcrypt');


// Chỉnh sửa thông tin cá nhân của người dùng
const updateUser = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params;
        let {
            email,
            mat_khau,
            ho_ten,
            tuoi,
            anh_dai_dien
        } = req.body;
        // Mã hóa mat_khau
        let mat_khau_hash = bcrypt.hashSync(mat_khau, 10)
        let checkUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        });
        if (checkUser) {
            let result = await model.nguoi_dung.update({
                email,
                mat_khau: mat_khau_hash,
                ho_ten,
                tuoi,
                anh_dai_dien
            }, { where: { nguoi_dung_id } });
            successCode(res, result, "Cập nhật người dùng thành công");
        } else {
            failCode(res, nguoi_dung_id, "Người dùng không tồn tại");
        }
    }
    catch (error) {
        errorCode(res, "Lỗi BackEnd");
    }
}
module.exports = { updateUser }