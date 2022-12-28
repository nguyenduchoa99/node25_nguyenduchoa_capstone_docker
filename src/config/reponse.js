// 200 => Thực hiện thành công
const successCode = (res,data,message) =>{
    res.status(200).json({
        message,
        content:data
    });
};
// Lỗi 400 => lỗi người dùng
const failCode = (res,data,message)=>{
    res.status(400).json({
        message,
        content:data
    });
};
// Lỗi 500 => lỗi BE
const errorCode = (res,message)=>{
    res.status(500).send(message);
}

module.exports = {
    successCode,
    failCode,
    errorCode
}