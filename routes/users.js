var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var fs = require('fs');
var pdf = require('html-pdf');
var _basePath = 'file:///' + __dirname + '\\Media\\';
var options = {format:'A4', base:_basePath};

var Cart = require('../models/cart');
var Order = require('../models/order');
var Company = require('../models/company');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req, res, next) {

  var userName = req.user;
  console.log(userName);
  User.findById(req.user._id, function(err,result){

      Order.find({'user': result}).lean()
    .exec(function(err, orders) {
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        // console.log(orders);
        res.render('users/profile', { orders: orders, user:userName});
    })
  });
  
});

router.get('/printOrder/:id', isLoggedIn, function(req,res,next){
  var id = req.params.id;
  Order.findById(id, function(err,result){
    if(err){
      return res.render('/');
    }
    var cart;
    cart = new Cart(result.cart);
    result.items = cart.generateArray();
    console.log('this is order : ' + result);
    var fileName = './invoices/invoice-' + result._id + '-' + result.orderDate.toISOString().substring(0, 10) + '.pdf';
    
    res.render('users/orderTemplate', {order:result}, function(err,html){
      if(err){
        return console.log(err);
      }
      //var html = fs.readFileSync('views/users/orderTemplate.ejs', 'utf8');


      pdf.create(html,options).toFile( fileName, function(err,resultt){
        if(err){
          return console.log(err);
        }
        else{
         
         var datafile = fs.readFileSync(fileName);
         res.header('content-type','application/pdf');
         res.send(datafile);  

        }
      })
    });
   
  })
})

router.get('/logout', isLoggedIn, function(req,res,next){
  req.logout();
  res.redirect('/');
})

router.use('/', notLoggedIn, function(req,res,next){
  next();
})

router.get('/signin', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('users/signin',{csrfToken : req.csrfToken(), messages:messages});
});

router.get('/signup', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('users/signup', {csrfToken : req.csrfToken(), messages:messages});
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signup', {
  failureRedirect:'signup',
  failureFlash:true
}), function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }
  else{
    res.redirect('/users/profile');
  }
});

router.post('/signin', notLoggedIn, passport.authenticate('local.signin', {
  failureRedirect:'signin',
  failureFlash:true
}), function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    console.log(oldUrl);
    res.redirect(oldUrl);
  }
  else{
    res.redirect('/users/profile');
  }
})


module.exports = router;


function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next(); 
  }
  req.session.oldUrl = req.url;
  res.redirect('/users/signin');
}

function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next(); 
  }
  res.redirect('/');
}