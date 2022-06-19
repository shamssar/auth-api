'use strict';
const {authenticateBearer} = require("../models/usersAuth");


async function bearer(req, res, next) {
    if (req.headers.authorization) {
        const bearerToken = req.headers.authorization.split(" ")[1];
        authenticateBearer(bearerToken)
            .then((userData) => {
                req.user = userData;
                next();
            })
            .catch(() => {
                res.status(403);
                res.send("Invalid Signin");
            })
    }
    else{
        res.status(403).send("Invalid Signin");
    }
}

module.exports = bearer;