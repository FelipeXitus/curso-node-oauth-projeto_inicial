exports.checkAuth = (req, res, next) => {
    if (req.session && req.session.user || req.isAuthenticated()) {
        next();
    } else {
        res.status(401).redirect('/');
    }
}