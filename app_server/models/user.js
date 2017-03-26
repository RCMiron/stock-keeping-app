var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT = 10;

var userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

var noop = function(){};
userSchema.pre('save', function(done){
  var user = this;
  if(!user.isModified('password')){
    return done();
  }
  bcrypt.genSalt(SALT, function(err, salt){
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword){
      if(err){
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(guess, done){
  bcrypt.compare(guess, this.password, function(err, isMatch){
    done(err, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;