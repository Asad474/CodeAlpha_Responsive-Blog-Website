const sessions = require('express-session');
const mongostore = require('connect-mongo');
require('dotenv').config();

module.exports = sessions({
    store: mongostore.create({
        mongoUrl : process.env.MONGODB_URL,
        ttl: 15 * 24 * 60 * 60
    }),
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false 
}); 