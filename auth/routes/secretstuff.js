'use strict';
const express = require('express');
const secretStuffRouters=express.Router();
const bearerAuth=require('../middlewares/bearer');
const logger=require("../middlewares/logger");

secretStuffRouters.get('/secretstuff',bearerAuth,(req,res)=>{
    res.status(200).json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });})

secretStuffRouters.use(logger);

module.exports=secretStuffRouters;