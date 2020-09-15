var jwt = require('jsonwebtoken');
var self = {};

var secret = 'ducnt3';

self.generateJWT = function(data) {
    return jwt.sign({
        id: data.id,
        email: data.email,
        role: data.role,
    }, secret, {expiresIn: 60 * 60 * 24});
},

self.checkToken = function(req, res, next) {
    jwt.verify(req.headers['x-auth'], secret , function(err, decoded) {
        if (err !== null) {
            return res.status(401).end();
        }
        next();
    })
},

self.isAuth = function(req, res, next) {
    var email = req.body.email;
    jwt.verify(req.headers['x-auth'], secret , function(err, decoded) {
        if (err !== null) {
            return res.status(401).end();
        }
        if (decoded.role === 0) {
            return next();
        } else {
            if (decoded.email === email) {
                return next();
            }
        }
        return res.status(401).json({
            msg: 'Customer is invalid'
        });

    })
}
self.isAdmin = function(req, res, next) {
    var isAdmin;
    jwt.verify(req.headers['x-auth'], secret , function(err, decoded) {
        if (err !== null) {
            return res.status(401).end();
        }
        isAdmin = (decoded.role === 0);
    })
    return isAdmin;
}
module.exports = self;

