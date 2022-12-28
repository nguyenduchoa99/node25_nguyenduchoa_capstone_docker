const express = require('express');
const rootRouter = express.Router();
const authRoute = require('./authRouter');
const homeRoute = require('./homeRoute');
const detailRoute = require('./detailRoute');
const imageRoute = require('./imageRoute');
const addImgRoute = require('./addImgRoute');
const updateUserRoute = require('./updateUserRoute');

rootRouter.use('/auth', authRoute);
rootRouter.use('/home',homeRoute);
rootRouter.use('/detail',detailRoute);
rootRouter.use('/image',imageRoute);
rootRouter.use('/add',addImgRoute);
rootRouter.use('/update',updateUserRoute);
module.exports = rootRouter;