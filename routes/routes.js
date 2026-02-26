const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/index')
const middleware = require('../middleware/index')
const session = require('express-session')
const sessionStorage = require('../util/sessionStorage');
const passport = require('../passport-config')

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStorage
}));


router.use(bodyParser.urlencoded({ extended: true }))

router.use(passport.initialize());
router.use(passport.session());
require('../passport-config');

router
    .get('/', controller.showIndex)
    .post('/', controller.loginUser)
    .get('/signup', controller.showPageSignUp)
    .post('/signup', controller.createUser)
    .get('/members', middleware.checkAuth, controller.showMembersPage)
    .get('/logout', controller.logoutUser)
    .get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
    .get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), controller.githubCallback)
router.use(controller.get404Page)

module.exports = router
