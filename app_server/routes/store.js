var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport  =require('passport');

var ctrlStore = require('../controllers/store');



var csrfProtection = csrf();
router.use(csrfProtection);

router.use('/', isLoggedIn, function(req, res, next){
  next();
})

router.get('/', ctrlStore.getStorePage);
router.get('/log', ctrlStore.logRead)
router.get('/items', ctrlStore.itemsReadAll);
router.get('/items/:item', ctrlStore.itemsReadOne);
router.post('/items/:item', ctrlStore.itemsCreateOne);
router.put('/items/:item', ctrlStore.itemsUpdateOne);
router.delete('/items/:item', ctrlStore.itemsDeleteOne);



//route protection middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
