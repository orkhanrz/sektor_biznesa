const jwt = require('jsonwebtoken');
const config = require('../config/dev');

const auth = (req, res, next) => {
    const token = req.session.token;

    if (!token){
        return res.status(403).json({message: 'You are not authorized!'});
    };

    const verifiedToken = jwt.verify(token, config.jwt.key);

    if (!verifiedToken){
        return res.status(403).json({message: 'You are not authorized!'});
    };

    next();
};

module.exports = auth;