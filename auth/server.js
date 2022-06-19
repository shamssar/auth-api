'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signinRouters=require("./routes/signin");
const signupRouters=require("./routes/signup");
const getUsersRouters=require("./routes/getUsers");
const secretStuffRouters=require("./routes/secretstuff");

const v1Router=require("./routes/v1");
const v2Router=require("./routes/v2");

app.use(express.json());
app.use(signinRouters);
app.use(signupRouters);
app.use(getUsersRouters);
app.use(secretStuffRouters);

app.use('/api/v1',v2Router);
app.use('/api/v2',v1Router);


app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};