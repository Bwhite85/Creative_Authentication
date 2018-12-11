var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).
    digest('base64').toString();
}
exports.signup = function(req, res) {
    console.log("Begin exports.signup");
    var user = new User({ username: req.body.username });
    console.log("after new user exports.signup");
    user.set('hashed_password', hashPW(req.body.password));
    console.log("after hashing user exports.signup");
    user.set('email', req.body.email);
    console.log("after email user exports.signup");
    user.save(function(err) {
        console.log("In exports.signup");
        console.log(err);
        if (err) {
            res.session.error = err;
            res.redirect('/signup');
        }
        else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.msg = 'Authenticated as ' + user.username;
            res.redirect('/');
        }
    });
};
exports.login = function(req, res) {
    User.findOne({ username: req.body.username })
        .exec(function(err, user) {
            if (!user) {
                err = 'User Not Found.';
            }
            else if (user.hashed_password ===
                hashPW(req.body.password.toString())) {
                req.session.regenerate(function() {
                    console.log("login");
                    console.log(user);
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg = 'Authenticated as ' + user.username;
                    req.session.SS = user.SS;
                    req.session.momsMaiden = user.momsMaiden;
                    req.session.firstPet = user.firstPet;
                    res.redirect('/');
                });
            }
            else {
                err = 'Authentication failed.';
            }
            if (err) {
                req.session.regenerate(function() {
                    req.session.msg = err;
                    res.redirect('/login');
                });
            }
        });
};
exports.getUserProfile = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (!user) {
                res.json(404, { err: 'User Not Found.' });
            }
            else {
                res.json(user);
            }
        });
};
exports.updateUser = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            console.log(req.body);
            user.set('email', req.body.email);
            user.set('SS', req.body.SS);
            user.set('firstPet', req.body.firstPet);
            user.set('momMaiden', req.body.momMaiden);
            user.save(function(err) {
                if (err) {
                    res.sessor.error = err;
                }
                else {
                    req.session.msg = 'User Updated.';
                    req.session.SS = req.body.SS;
                    req.session.firstPet = req.body.firstPet;
                    req.session.momMaiden = req.body.momMaiden;
                }
                res.redirect('/user');
            });
        });
};
exports.comment = function(req, res){
    User.findOne({_id: req.session.user})
        .exec(function(err, user) {
            if(!user){
                res.json(404, {err: "User comments not found"});
            }
            else{
                res.json(user.comment);
            }
        });
};
exports.pushComment = function(req, res){
    console.log("/comment post route");
    User.findOne({ _id: req.session.user })
        .exec(function(err, user){
            user.set('comment', req.body.comment);
            user.save(function(err) {
                if (err) {
                    res.session.error = err;
                }
                else {
                    req.session.comment = req.body.comment;
                }
                res.redirect('/comment');
        })
        })
};
exports.deleteUser = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (user) {
                user.remove(function(err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function() {
                        res.redirect('/login');
                    });
                });
            }
            else {
                req.session.msg = "User Not Found!";
                req.session.destroy(function() {
                    res.redirect('/login');
                });
            }
        });
};