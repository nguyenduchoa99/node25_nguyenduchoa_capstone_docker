const express = require('express');
const app = express();
// Middleware chuyển đổi data json từ FE xuống express
app.use(express.json());
// Định nghĩa lại url để sử dụng tài nguyên
app.use(express.static("."));
const cors = require('cors');
app.use(cors());
// Domain
app.listen(8080);
const rootRouter = require('./routers/index');
app.use("/api",rootRouter);