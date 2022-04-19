var express = require('express');
var router = express.Router();
//var csrf = require('csurf');
var path = require('path');
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Company = require('../models/company');
var multer = require('multer');

var Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: process.env.MY_KEY_ID,
  key_secret: process.env.MY_KEY_SECRET
});

var storage = multer.diskStorage({
  
  destination: function(req,file,cb){
    
      cb(null, './documents/');
  
    },
  filename: function(req,file,cb){
    if(file.fieldname === 'gstFile'){
      
      cb(null, new Date().toISOString().replace(/:/g, '-').substring(0, 10) + '-' +  req.user.name + '-' +  'GSTFILE' + '.' + file.mimetype.split('/').reverse()[0]);
    }
    if(file.fieldname === 'panFile'){
     
      cb(null, new Date().toISOString().replace(/:/g, '-').substring(0, 10) + '-' +  req.user.name + '-' +  'PANFILE' + '.' + file.mimetype.split('/').reverse()[0]);
    }
    if(file.fieldname === 'shopLicense'){
      
      cb(null, new Date().toISOString().replace(/:/g, '-').substring(0, 10) + '-' +  req.user.name + '-' +  'LICENSE' + '.' + file.mimetype.split('/').reverse()[0]);
    }

  }
  
});

var fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}

var upload = multer({
  storage: storage, 
  limits:{fileSize: 1024 * 1024 * 5},
  fileFilterr: fileFilter
});

// var csrfProtection = csrf();
// router.use(csrfProtection);

router.get('/registration', async (req,res,next) => {
  
  res.render('registration');
}) 

router.post('/registration', upload.fields([{ name: 'gstFile', maxCount: 1 }, { name: 'panFile', maxCount: 1 }, { name: 'shopLicense', maxCount: 1 }]), function(req, res, next){
  

  var obj = Object.assign({},req.files)
  var path1 = obj.gstFile[0].path;
  var path2 = obj.panFile[0].path;
  var path3 = obj.shopLicense[0].path;

    
   var company = new Company({
      user:req.user,
      name:req.body.name,
      companyName:req.body.cname,
      address:req.body.caddress,
      contact:req.body.contact,
      email:req.body.email,
      gst:path1,
      pan:path2,
      license:path3,
      cmpnyStarted:req.body.estYear,    
   });
   company.save(function(err,result){
     if(err){
       console.log(err);
     }
     User.updateOne({"_id" : req.user._id}, {$set: {'companyApplied': true}}, function(err,result){
       if(err){
         console.log(err);
       }
       res.redirect('/');
     })
     
   })

});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  var emiAmount = Math.round(req.session.cart.totalPrice/3);
  User.findById(req.user._id, function(err,result1){
    var myKeyId = process.env.MY_KEY_ID;
    var options = {
      amount: req.session.cart.totalPrice * 100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture:'1'
    };
    
    instance.orders.create(options, function(err, order) {
      if(result1.companyApplied){
        Company.find( {'user' : result1}, function(err,result2){
        console.log(order);
        res.render('checkout', {emiAmount: emiAmount, cmpnyStatus: result2[0].companyStatus, orderId : order.id, keyValue: myKeyId, fees: req.session.cart.totalPrice*100});
        // csrfToken : req.csrfToken(),
        });
    }
    else{
      res.render('checkout', {emiAmount: emiAmount, cmpnyStatus: 'nil', orderId : order.id, keyValue: myKeyId, fees: req.session.cart.totalPrice*100});
    }


  });
    
    
 
  });
});

router.get('/checkoutEMI', isLoggedIn, function(req,res,next){

  var emiAmount = Math.round(req.session.cart.totalPrice/3);
  User.findById(req.user._id, function(err,result1){
    var myKeyId = process.env.MY_KEY_ID;
    var options = {
      amount: emiAmount * 100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture:'1'
    };
    instance.orders.create(options, function(err, order) {
        Company.find( {'user' : result1}, function(err,result2){
        console.log(result2);
        res.render('checkoutEMI', {emiAmount: emiAmount, company: result2, orderId : order.id, keyValue: myKeyId, fees: req.session.cart.totalPrice});
        });
   
  });

});

});

router.post('/api/payment/verify', isLoggedIn, function(req,res,next){
  console.log(req.body);
  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
  var keySecret = process.env.MY_KEY_SECRET;
  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', keySecret)
                                   .update(body.toString())
                                   .digest('hex');
  console.log("sig received " ,req.body.response.razorpay_signature);
  console.log("sig generated " ,expectedSignature);
  
   var response = "false";
   if(expectedSignature === req.body.response.razorpay_signature){
    
    var cart = req.session.cart;
    var order = new Order({
      user:req.user,
      name: req.body.name,
      companyName: req.body.cname,
      deliveryAddress:req.body.daddress,
      contact:req.body.contact,
      email:req.body.email,
      paymentType:req.body.paymentType,
      amtReceived: req.session.cart.totalPrice,
      amtPending:'NIL',
      paymentStatus:'Fully Paid',
      cart:cart
    });
    console.log('this is ' + order);
    order.save(function(err,result){
      if(err){
        console.log(err);
      }
      else{
      console.log('this is' +  result);
      req.session.cart=null;
      response="true";
      res.send(response);

      }
      
      
      
    });
 
  }
});

router.post('/api/payment/verify1', isLoggedIn, function(req,res,next){
  // console.log(req.body);
  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
  var keySecret = process.env.MY_KEY_SECRET;
  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', keySecret)
                                   .update(body.toString())
                                   .digest('hex');
  console.log("sig received " ,req.body.response.razorpay_signature);
  console.log("sig generated " ,expectedSignature);
  
   var response = "false";
   if(expectedSignature === req.body.response.razorpay_signature){
    
    var cart = req.session.cart;
    var order = new Order({
      user:req.user,
      name: req.body.name,
      companyName: req.body.cname,
      deliveryAddress:req.body.daddress,
      contact:req.body.contact,
      email:req.body.email,
      paymentType:req.body.paymentType,
      amtReceived:req.body.amtReceived,
      amtPending: req.session.cart.totalPrice - req.body.amtReceived,
      paymentStatus:'Partial',
      cart:cart
    });
    console.log('this is ' + order);
    order.save(function(err,result){
      if(err){
        console.log(err);
      }
      else{
      console.log(result);
      req.session.cart=null;
      response="true";
      res.send(response);  
      }

    });
    
   
  }
});

router.get('/',   function(req, res, next) {
  Product.find({$or:[{inDemand:1},{newArrival:1}]}, function(err,result){
    if(err){
      console.log(err)
    }
    console.log(res.locals.login);

    res.render('index', { title: 'BioMedical', frontProducts:result });
  })
  
});

router.get('/shoppingCart', function(req,res,next){
  if(!req.session.cart){
    return res.render('shoppingCart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  console.log(cart);
  res.render('shoppingCart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/products', function(req,res,next){
  res.render('products', {title: 'BioMedical Systems'})
});

router.get('/add-to-cart/:id/:source', function(req,res,next){
  var productId = req.params.id;
  var source = '/category/' + req.params.source;
  console.log(productId);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, result){
    if(err){
      console.log(err);
      res.redirect('/');
    }
    cart.add(result,result.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect(source);
  })
})

router.get('/reduce/:id',  function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart);
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shoppingCart');
})

router.get('/addOne/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart);
  Product.findById(productId, function(err, result){
    if(err){
      console.log(err);
      res.redirect('/');
    }
    cart.add(result,result.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shoppingCart');
  })
})

router.get('/productPage', function(req,res,next){
  res.render('productPage', {title:'Product | BMS'});
})

router.get('/aboutUs', function(req,res,next){
  res.render('aboutUs', {title:'Bio Medical Systems'})
})

module.exports = router;


function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next(); 
  }
  req.session.oldUrl = req.url;
  res.redirect('/users/signin');
}


