var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res) {
    console.log("/ Route");
    //    console.log(req);
    console.log(req.session);
    if (req.session.user) {
        console.log("/ Route if user");
        res.render('index', {
            username: req.session.username,
            msg: req.session.msg,
            SS: req.session.SS,
            firstPet: req.session.firstPet,
            momMaiden: req.session.momMaiden
        });
        console.log("after res render");
    }
    else {
        console.log("/ Route else user");
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
    console.log("I am done");
});
router.get('/comment', function(req, res) {
    console.log("/comment Route");
    //    console.log(req);
    console.log(req.session);
    if (req.session.user) {
        console.log("/comment Route if user");
        res.render('comment', {
            username: req.session.username,
            comment: req.session.comment
        });
        console.log("after res render");
    }
    else {
        console.log("/ Route else user");
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
    console.log("comment get is done.");
});

router.get('/user', function(req, res) {
    console.log("/user Route");
    if (req.session.user) {
        res.render('user', { msg: req.session.msg });
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
});
router.get('/signup', function(req, res) {
    console.log("/signup Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('signup', { msg: req.session.msg });
});
router.get('/login', function(req, res) {
    console.log("/login Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('login', { msg: req.session.msg });
});
router.get('/logout', function(req, res) {
    console.log("/logout Route");
    req.session.destroy(function() {
        res.redirect('/login');
    });
});
//these funcitons are within the controller file
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.post('/pushComment', users.pushComment);
router.get('/user/profile', users.getUserProfile);
router.get('/comment', users.comment);

module.exports = router;