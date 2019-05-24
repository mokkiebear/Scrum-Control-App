const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try{
        console.log(config.get('jwtPrivateKey'));
        console.log(token);
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;
