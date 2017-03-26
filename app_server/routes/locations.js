var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport  =require('passport');

var ctrlLoc = require('../controllers/locations');



var csrfProtection = csrf();
router.use(csrfProtection);

router.use('/', isLoggedIn, function(req, res, next){
  next();
})

router.get('/', ctrlLoc.locationsReadAll);
router.get('/:location', ctrlLoc.locationsReadOne);
router.post('/:location', ctrlLoc.locationsCreateOne);
router.put('/:location', ctrlLoc.locationsUpdateOne);
router.delete('/:location', ctrlLoc.locationsDeleteOne);



//route protection middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
