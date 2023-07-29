const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');

router.route('/login')
    .get(usercontroller.loginpage)
    .post(usercontroller.loginuser);

router.route('/register')
    .get(usercontroller.registerpage)
    .post(usercontroller.registeruser);

router.get('/logout', usercontroller.logoutuser);    

module.exports = router; 