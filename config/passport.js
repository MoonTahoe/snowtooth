var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {

        User.withID(id, function(user) {
            done(null, user);
        });

    });

    passport.use('local-register', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            process.nextTick(function () {

                User.fetch(email, function(user) {

                    if (user) {
                        return done(null, false, req.flash('registerMessage', 'The email &lt' + email + ';&gt; is already in our system.'));
                    } else {

                        User.add({
                            name: req.body.name,
                            email: email,
                            password: password
                        }, function(newUser) {
                            done(null, newUser);
                        });

                    }

                });

            });

        }
    ));

};