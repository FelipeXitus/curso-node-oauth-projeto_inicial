const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.AUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
    callbackURL: process.env.AUTH_GITHUB_CALLBACK_URL
}, 
async function (accessToken, refreshToken, profile, done) {
    try {
        //User.findOrCreate({ githubId: profile.id }, async function (err, user) {
            return done(null, profile.id);
        //});
    } catch (err) {
        return done(err);
    }
}));
module.exports = passport;