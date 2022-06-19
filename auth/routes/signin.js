'use strict';
const express = require('express');
const signinRouters=express.Router();
const basicAuth=require('../middlewares/basic');
const logger=require("../middlewares/logger");

signinRouters.use(logger);
signinRouters.post('/signin',basicAuth,(req,res)=>{
res.status(200).json(req.user);
})

module.exports=signinRouters;