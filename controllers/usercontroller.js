const bcrypt = require('bcrypt');
const User = require('../models/usermodel');

const loginpage = (req, res) => {
    if (res.locals.isLoggedIn){
        return res.redirect('/');
    };

    return res.render('login');
};


const loginuser = async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if (!user){
            return res.send('Email is invalid...');
        };

        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password){
            return res.send('Password is invalid...');
        };

        req.session.userid = user.id;
        return res.redirect('/');
    } catch(err){
        console.log(err);
        return res.send('Internal Server Error.');
    };
};


const registerpage = (req, res) => {
    if (res.locals.isLoggedIn){
        return res.redirect('/');
    }

    return res.render('register');
};


const registeruser = async(req, res) => {
    try{
        const password = req.body.password;

        if (password !== req.body.confirm_password){
            return res.send('Password and Confirm Password are not matching with each other.');
        } else if (password.length < 8){
            return res.send('Password should be atleast 8 characters.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedpassword
        });

        if (!user){
            return res.send('Something went wrong!!!');
        };

        return res.redirect('/login');
    } catch(err){
        console.log(err);
        return res.send('Internal Server Error.');
    };
};


const logoutuser = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
}


module.exports = {
    loginpage,
    loginuser,
    registerpage,
    registeruser,
    logoutuser,
};