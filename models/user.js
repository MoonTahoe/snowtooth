var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local : {
        name: String,
        email: String,
        password : String
    },
    yahoo : {
        id : String,
        token : String,
        email : String,
        name : String,
        pic: String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var dbModel = mongoose.model('user', userSchema, 'user');
var model = dbModel;

module.exports = {

    model: model,
    injectModel: function (m) {
        model = m;
    },
    resetModel: function() {
        model = dbModel;
    },
    fetch: function (done) {

        var count,
            email,
            done;

        if (typeof arguments[0] == "string") {
            email = arguments[0];
            done = arguments[1]
        } else if (typeof arguments[0] == "number") {
            count = arguments[0];
            done = arguments[1];
        } else if (typeof arguments[0] == "function") {
            done = arguments[0];
        }

        if (email) {

            model.findOne({ 'local.email': email }, function (err, user) {
                if (err) throw err;
                done(user);
            });

        } else if (count) {

            model.find().sort({ 'date': 1 }).limit(count).exec(function (err, users) {
                if (err) throw err;
                done(users);
            });

        } else {

            model.find().sort({ 'date': 1 }).exec(function (err, users) {
                if (err) throw err;
                done(users);
            });

        }

    },
    withID: function(id, done) {

        model.findById(id, function(err, user) {
            if (err) throw err;
            else {
                done(user);
            }
        });

    },
    add: function(user, done) {
        var newUser = new model();

        newUser.local.name = user.name;
        newUser.local.email = user.email;
        newUser.local.password = newUser.generateHash(user.password);

        newUser.save(function (err) {
            if (err) throw err;
            return done(newUser);
        });
    }

};