var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  email: String,
  name: String,
  githubUser: String,
  password: String,
  boughtPackageId: String
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('users', User);
