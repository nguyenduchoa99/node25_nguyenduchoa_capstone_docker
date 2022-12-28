const jwt = require('jsonwebtoken');
// Hàm tạo token
const parseToken = (data) => {
    // Mã bí mật: cybersoft
    // Thời hạn : 1 năm
    let token = jwt.sign({ data }, "cybersoft", { algorithm: 'HS256', expiresIn: '1y' });
    return token;
};

const checkToken = (token) => {
    try {
        let checkTokenData = jwt.verify(token, "cybersoft");
        if (checkTokenData) {
            return { checkData: true, message: "" };
        } else {
            return { checkData: false, message: "Token không hợp lệ" };
        }
    }
    catch (error) {
        return { checkData: false, message: error.message };
    }
};

const verifyToken = (req, res, next) => {
    const { token } = req.headers;
    const verifyToken = checkToken(token);
    if (verifyToken.checkData) {
        next();
    } else {
        res.status(401).send(verifyToken.message);
    }
};

module.exports = {
    parseToken,
    checkToken,
    verifyToken
}