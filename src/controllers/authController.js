const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/reponse');
const { parseToken } = require('../middlewares/baseToken');
const bcrypt = require('bcrypt');
// các hàm xử lý chức năng ở BE chứa trong thư mục controllers

// REGISTER
const register = async (req, res) => {
    try {
        // Lấy dữ liệu từ body truyền vào từ FrontEnd
        let {
            email,
            mat_khau,
            ho_ten,
            tuoi,
            anh_dai_dien
        } = req.body;

        //Mã hóa mat_khau
        let mat_khau_hash = bcrypt.hashSync(mat_khau, 10);
        // Trả về object
        let checkEmail = await model.nguoi_dung.findOne({
            where: {
                email
            }
        })
        if (checkEmail) {
            // Nếu trùng email sẽ vào if => Báo lỗi đã tồn tại
            failCode(res, { email, mat_khau, ho_ten, tuoi, anh_dai_dien }, 'Email đã tồn tại!');
            
        } else {
            // Nếu không trùng email sẽ vào else => Tạo tài khoản thành công
            let result = await model.nguoi_dung.create({
                email,
                mat_khau: mat_khau_hash,
                ho_ten,
                tuoi,
                anh_dai_dien
            });
            successCode(res, result, "Đăng ký khoản thành công");
        }
    }
    catch (error) {
        // Nếu bị lỗi ở try sẽ báo lỗi BackEnd
        console.log(JSON.stringify(error));
        errorCode(res, "Lỗi BackEnd");
    }
}
// LOGIN
const login = async (req, res) => {
    try {
        // Lấy dữ liệu truyền vào từ FrontEnd
        let { email, mat_khau } = req.body;
        let checkLogin = await model.nguoi_dung.findOne({
            where: {
                email
            }
        });
        // Check mat_khau 
        if (checkLogin) { // Kiểm tra email đã tồn tại hay chưa
            let checkMatKhau = bcrypt.compareSync(mat_khau, checkLogin.mat_khau);
            // true => đúng mật khẩu
            if (checkMatKhau) {
                successCode(res, parseToken(checkLogin), "Đăng nhập thành công");
            }
            else {
                // false => không đúng mật khẩu
                failCode(res, "", "Mật khẩu không đúng");
            }
        } else {
            // false => Email không đúng hoặc không tồn tại
            failCode(res, "", "Email không đúng");
        }
    }
    catch (error) {
        // Nếu bị lỗi ở try sẽ báo lỗi BackEnd
        errorCode(res, "Lỗi BackEnd");
    }
};


module.exports = {
    register,
    login
}