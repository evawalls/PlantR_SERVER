const validateAdmin = (req, res, next) => {
    if (req.user.role === '1') {
        return next();
    } else {
        return res.status(500).send('No green thumb, hunh?');
    }
};

module.exports = validateAdmin;

//must run after validate-session