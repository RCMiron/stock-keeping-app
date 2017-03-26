var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport  = require('passport');

var ctrlUsr = require('../controllers/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.use('/', isLoggedIn, function(req, res, next){
  next();
});

router.get('/:username', ctrlUsr.getUserAccount);
router.put('/:username', ctrlUsr.updateUserAccount);
router.delete('/:username', ctrlUsr.deleteUserAccount);

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
  next();
});

router.get('/signup', ctrlUsr.getUserSignup);
router.post('/signup', ctrlUsr.userSignup);
router.get('/signin', ctrlUsr.getUserSignin);
router.post('/signin', ctrlUsr.userSignin);



//route protection middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req, res, next){
  if(req.isAuthenticated){
    return next();
  }
  res.redirect('/')
}
module.exports = router;
