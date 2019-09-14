const express = require('express');
const bodyParser = require('body-parser');
const ExpressGraphQL = require("express-graphql");
const expressRateLimit = require('express-rate-limit');
require('dotenv').config();

const { dbconnection } = require('./app/connection');
const schema = require('./app/schema');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rate Limiter
const rateLimiter = expressRateLimit({
    windowMs: 60 * 60 * 1000, // 1hr
    max: 1000,
    message: "Too many accounts created from this IP, please try again after an hour"
});
app.use(rateLimiter);

// mongoose connection
dbconnection();

// GraphQL
app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

const server = app.listen(port, () => {
    console.log('APP is listening on port:', port);
});

module.exports = server;