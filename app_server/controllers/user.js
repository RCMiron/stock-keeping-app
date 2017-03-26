var passport  = require('passport');

module.exports.getUserSignup = function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
};
module.exports.userSignup = passport.authenticate('local.signup',{
  successRedirect: '/store',
  failureRedirect: '/user/signup',
  failureFlash: true
});
module.exports.getUserSignin = function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
};
module.exports.userSignin = passport.authenticate('local.signin',{
  successRedirect: '/store',
  failureRedirect: 'user/signin',
  failureFlash: true
});
module.exports.getUserAccount = function(req, res, next){};
module.exports.updateUserAccount = function(req, res, next){};
module.exports.deleteUserAccount = function(req, res, next){};
