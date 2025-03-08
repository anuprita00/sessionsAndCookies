//Protects routes by checking if the user session exists.
const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect("/auth/login");
};

module.exports = { ensureAuthenticated };