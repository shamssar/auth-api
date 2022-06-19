'use strict';
const {authenticateBasic} = require("../models/usersAuth");
const base64 = require('base-64');

async function basicAuth(req,res,next){
    if(req.headers.authorization){
    let basicHeaderParts = req.headers.authorization.split(' ');  
    let encodedString = basicHeaderParts.pop(); 
    let decodedString = base64.decode(encodedString);           
    let [username, password] = decodedString.split(':'); 

   authenticateBasic(username, password)
    .then((validUser) => {
        req.user = validUser;
        next();
    })
    .catch((err) => {
        res.status(403);
        res.send("Invalid Signin");
    })

}else{
    res.status(403).send("Invalid Signin");
}
}

module.exports=basicAuth; 