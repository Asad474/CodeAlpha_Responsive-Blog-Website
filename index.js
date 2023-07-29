const express = require('express');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const connDB = require('./config/db');
const sessions = require('./config/sessions');
const blogroutes = require('./routes/blogroutes');
const userroutes = require('./routes/userroutes');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
connDB();

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(sessions);
app.use(cookie_parser());

app.use(authMiddleware);

app.use('/', userroutes, blogroutes);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})