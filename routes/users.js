var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    /* User Profile Page */
    router.get('/', function (req, res) {
        res.render('profile', {
            title: 'Skier Profile Page',
            description: 'manage your membership account',
            user: req.user
        });
    });

    /* User Login Page */
    router.get('/login', function (req, res) {
        res.render('login', {
            title: 'Snowtooth Skier Login',
            description: 'Log in and start earning skier points now',
            message: req.flash('loginMessage')
        });
    });

    /* Registration Page */
    router.get('/register', function (req, res) {
        res.render('register', {
            title: 'Create a new Skier Account',
            description: 'Create a Snowtooth skier account',
            message: req.flash('registerMessage')
        });
    });

    /* User Login Page */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /* Handle New Users */
    router.post('/register', passport.authenticate('local-register', {
        successRedirect : '/user',
        failureRedirect: '/user/register',
        failureFlash : true
    }));

    return {
        router: router,
        isLoggedIn: isLoggedIn
    }

};

/**
 * Checks to see if the current user is authenticated
 */
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');

}
