var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done){
    req.checkBody('username', 'Only letters and digits please').notEmpty().isAlpha();
    req.checkBody('password', 'Password needs to be at least 6 characters long').notEmpty().isLength({min: 6});
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    var errors = req.validationErrors();
    if(errors){
      var messages = [];
      error.forEach(function(error){
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
    User.findOne({'username': username}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, false, {message: 'Username already in use'});
      }
      var newUser = newUser();
      newUser.email = email;
      newUser.username = username;
      newUser.password = password;
      newUser.save(function(err, result){
        if(err){
          return done(err);
        }
        return done(null, newUser);
      });
    });
  }
));

passport.use('local.signin', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done){
    req.checkBody('username', 'Only letters and digits please').notEmpty().isAlpha();
    req.checkBody('password', 'Password needs to be at least 6 characters long').notEmpty().isLength({min: 6});
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();

    var errors = req.validationErrors();
    if(errors){
      var messages = [];
      error.forEach(function(error){
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
    User.findOne({'username': username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, {message:'Invalid login credentials'});
      }
      if(!user.checkPassword(password)){
        return done(null, false, {message:'Invalid login credentials'});
      }
      return done(null, user);
    })
  }))
