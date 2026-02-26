const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(username, email, hashedPassword);
    try {
        await user.save();
        res.redirect('/');
    } catch (err) {
        res.status(500)
            .redirect('/signup')          
    }
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne(email, password);
        if (user) {
            req.session.user = user;
            res.redirect('/members');
        } else {
            res.status(401)
                .redirect('/')
        }
    } catch (err) {
        res.status(500)
            .redirect('/')
    }
}

exports.logoutUser = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.githubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect('/members');
}

exports.get404Page = (req, res, next) => {
    res.status(404)
        .render('404')
}