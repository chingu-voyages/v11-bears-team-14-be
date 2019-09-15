const express = require('express');
const bodyParser = require('body-parser');
const ExpressGraphQL = require("express-graphql");
const expressRateLimit = require('express-rate-limit');
const { verify } = require('jsonwebtoken');
require('dotenv').config();

const { dbconnection } = require('./app/connection');
const schema = require('./app/schema');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Rate Limiter
const rateLimiter = expressRateLimit({
    windowMs: 60 * 60 * 1000, // 1hr
    max: 1000,
    message: "Too many accounts created from this IP, please try again after an hour"
});
app.use(rateLimiter);

// mongoose connection
dbconnection();

app.use((req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader;
    if (!token) {
        req.isAuth = false;
        return next();
    }
    try {
        var isVerified = verify(token, process.env.JWT_SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!isVerified) {
        req.isAuth = false;
        return next();
    }
    console.log('verified token in header',isVerified.id);
    req.isAuth = true;
    req.uid = isVerified.id;
    return next();
})

// GraphQL
app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

const server = app.listen(port, () => {
    console.log('APP is listening on port:', port);
});

module.exports = server;