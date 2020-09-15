var auth = require('../middlewares/auth-middleware');
var User = require('../models/User');
var self = {};

self.signUp = function (req, res, next) {
    User.exists({email: req.body.email}, function (err, value) {
        if(value === true) {
            return res.json({
                msg: 'User is invalidate'
            });
        } else {
            User.create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            });
        }
    });
}

self.signIn = function (req, res, next) {
    delete req.headers['accept'];
    delete req.headers['accept-encoding'];
    delete req.headers['connection'];
    delete req.headers['host'];
    delete req.headers['user-agent'];
    delete req.headers['x-authoriation'];
    User.findOne({
            email: req.body.email,
            password: req.body.password
        }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            if (data === null) {
                return res.json({
                    token: '',
                    role: null,
                    status: 'fail'
                });
            }
            var token = auth.generateJWT(data);
            res.json({
                token: token,
                role: data.role,
                status: 'success'
            });
        }
    });
}

module.exports = self;