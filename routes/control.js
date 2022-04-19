var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var path = require('path');
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Company = require('../models/company');
var multer = require('multer');
const product = require('../models/product');


var fs = require('fs');
var pdf = require('html-pdf');
var _basePath = 'file:///' + __dirname + '\\Media\\';
var options = {format:'A4', base:_basePath};

var csrfProtection = csrf();
router.use(csrfProtection);


var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/images/items/');
    },
    filename: function(req,file, cb){
        cb(null, file.originalname);
    }
});

var fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(null,true);
    }
    
}

var upload = multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024 * 2},
    fileFilter: fileFilter
});



router.get('/dashboard', function(req,res,next){
    res.render('control/dashboard', {title:'BMS | Control'});
})

router.get('/companies', function(req,res,next){
    
    Company.find(function(err,result){
        console.log(result);
        res.render('control/companies', {title:'BMS | Companies', companies:result});
    })
    
})

router.get('/approveCompany/:id', function(req,res,next){
    var companyId = req.params.id;
    Company.updateOne({_id:companyId}, {$set:{'companyStatus':'true'}}, function(err,result){
        if(err){
            console.log(err);
            return res.redirect('/control/dashboard');
        }
        res.redirect('/control/companies');
    })
})

router.get('/blockCompany/:id', function(req,res,next){
    var companyId = req.params.id;
    Company.updateOne({_id:companyId}, {$set:{'companyStatus':'false'}}, function(err,result){
        if(err){
            console.log(err);
            return res.redirect('/control/dashboard');
        }
        res.redirect('/control/companies');
    })
})

router.get('/products', function(req,res,next){
    res.render('control/products', {title:'BMS | Products', products:{}, title:'', csrfToken : req.csrfToken()});
})

router.get('/prod/homeCare', function(req,res,next){
    Product.find({mainCategory:'HC'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'Home Care Products', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod/icuCare', function(req,res,next){
    Product.find({mainCategory:'ICC'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'ICU/CRITICAL CARE Products', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod/otEquipments', function(req,res,next){
    Product.find({mainCategory:'OE'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'OT Equipments', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod/diagImaging', function(req,res,next){
    Product.find({mainCategory:'DI'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'DIAGNOSTIC & IMAGING', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod/sa', function(req,res,next){
    Product.find({mainCategory:'SA'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'SUPPLIES & ACCESSORIES', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod/hf', function(req,res,next){
    Product.find({mainCategory:'HF'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'HOSPITAL FURNITURES', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod/cp', function(req,res,next){
    Product.find({mainCategory:'CP'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/products',{title:'BMS | Products', products:result, title:'COVID PRODUCTS', csrfToken : req.csrfToken()});
     });  
})

router.get('/addProduct', function(req,res,next){
    res.render('control/addProduct', {title:'BMS | Add Product'});
})

router.post('/newProduct', upload.single('productImg'), function(req,res,next){
    console.log(req.body.mainCategory, req.body.subCategory, req.body.dprice);
    var product = new Product({
        imagePath :'/'+ req.file.path,
        title: req.body.name,
        description: req.body.description,
        actualPrice: req.body.aPrice,
        discountPrice: req.body.dPrice,
        mainCategory: req.body.mainCategory,
        subCategory1: req.body.subCategory1,
        subCategory2: req.body.subCategory2,
        madeIn: req.body.madeIn,
        estimatedDelivery: req.body.estDelivery,
        brand:req.body.brand,
        packingCharge: req.body.packingCharge,
        shippingCharge: req.body.shippingCharge,  
    });
    product.save(function(err,result){
        if(err){
            console.log(err);
            return res.redirect('/control/addProduct');
        }
        res.redirect('/control/dashboard');
    })
})

router.post('/updateProduct/:id', function(req,res,next){
    var id = req.params.id;
    var title = req.body.name;
    var description = req.body.description;
    var actualPrice = req.body.actualPrice;
    var discountPrice = req.body.discountPrice;
    var madeIn = req.body.madeIn;
    var estimatedDelivery = req.body.estimatedDelivery;
    var warranty = req.body.warranty;
    var brand = req.body.brand;
   
    Product.updateOne({'_id': id},{$set: {
        "title": title, 
        "description": description, 
        "actualPrice":actualPrice, 
        "discountPrice" : discountPrice,
        "madeIn" : madeIn,
        "estimatedDelivery" : estimatedDelivery,
        "warranty" : warranty,
        "brand" : brand
    }}, function(err,result){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/makeUnavailable/:id', function(req,res,next){
    var id = req.params.id;
    Product.updateOne({_id:id}, {$set: {availability:0}}, function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/makeAvailable/:id', function(req,res,next){
    var id = req.params.id;
    Product.updateOne({_id:id}, {$set: {availability:1}}, function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/markInDemand/:id', function(req,res,next){
    var id = req.params.id;
    Product.updateOne({_id:id}, {$set: {inDemand:1}}, function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/markNoDemand/:id', function(req,res,next){
    var id = req.params.id;
    Product.updateOne({_id:id}, {$set: {inDemand:0}}, function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/noNewArrival/:id', function(req,res,next){
    var id = req.params.id;
    Product.updateOne({_id:id}, {$set: {newArrival:0}}, function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/newArrival/:id', function(req,res,next){
    var id = req.params.id;
    Product.updateOne({_id:id}, {$set: {newArrival:1}}, function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/control/products');
    })
})

router.get('/orders', function(req,res,next){


    Order.find(
        {cancelStatus:false},
        
        ).sort({_id:-1}).lean()
    .exec(function(err, orders) {
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.cart.items = cart.generateArray();
        });
        console.log(orders);
        res.render('control/orders', { orders: orders});
    })
})

router.get('/cancelledOrders', function(req,res,next){


    Order.find({cancelStatus:true}).lean()
    .exec(function(err, orders) {
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.cart.items = cart.generateArray();
        });
        console.log(orders);
        res.render('control/cancelledOrders', {orders: orders});
    })
})

router.get('/printOrder/:id',function(req,res,next){
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

router.get('/cancelOrder/:id', function(req,res,next){
    var id = req.params.id;
    Order.updateOne({'_id': id}, {$set: {cancelStatus:true}}, function(err,result){
        if(err){
          console.log(err);
          return res.render('/');
        }
        res.redirect('/control/orders');
    })
})
  
router.get('/revokeOrder/:id', function(req,res,next){
    var id = req.params.id;
    Order.updateOne({'_id': id}, {$set: {cancelStatus:false}}, function(err,result){
        if(err){
          console.log(err);
          return res.render('/');
        }
        res.redirect('/control/cancelledOrders');
    })
})

router.get('/priceHike', function(req,res,next){
    res.render('control/priceHike', {title:'BMS | Products', products:{}, title:''});
})


router.get('/prod1/homeCare', function(req,res,next){
    Product.find({mainCategory:'HC'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'Home Care Products', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod1/icuCare', function(req,res,next){
    Product.find({mainCategory:'ICC'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'ICU/CRITICAL CARE Products', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod1/otEquipments', function(req,res,next){
    Product.find({mainCategory:'OE'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'OT Equipments', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod1/diagImaging', function(req,res,next){
    Product.find({mainCategory:'DI'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'DIAGNOSTIC & IMAGING', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod1/sa', function(req,res,next){
    Product.find({mainCategory:'SA'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'SUPPLIES & ACCESSORIES', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod1/hf', function(req,res,next){
    Product.find({mainCategory:'HF'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'HOSPITAL FURNITURES', csrfToken : req.csrfToken()});
     });  
})

router.get('/prod1/cp', function(req,res,next){
    Product.find({mainCategory:'CP'},function(err,result){
            if(err){
                console.log(err);
                return res.render('control/dashboard');
            }
            res.render('control/priceHike',{title:'BMS | Products', products:result, title:'COVID PRODUCTS', csrfToken : req.csrfToken()});
     });  
})

router.post('/hikePrice/:id', function(req,res,next){
    var id = req.params.id;
    var hikePercentage = req.body.hikePercentage;
    if(hikePercentage > 0){
        Product.findById(id, function(err, result){
            if(err){
                console.log(err);
                return res.redirect('/control/dashboard');
            }
            hikeAmount = Math.round((result.discountPrice * hikePercentage)/100)
            var newPrice = result.discountPrice + hikeAmount;
            Product.updateOne({'_id':id}, {$set: {discountPrice:newPrice, oldPrice: result.discountPrice, hikedPrice:true}}, function(err,result){
                console.log(result);
                res.redirect('/control/priceHike');
            })
        })
    }
    else{
        res.redirect('/control/priceHike');
    }
});

router.get('/hikedProducts', function(req,res,next){
    Product.find({hikedPrice:true}, function(err, result){
        console.log(result);
    })
})

router.get('/resetPrice/:id', function(req,res,next){
    var id = req.params.id;
    Product.findById(id, function(err,result){
        var oldPrice = result.oldPrice;
        Product.updateOne({'_id':id}, {$set:{discountPrice: oldPrice, hikedPrice:false}}, function(err,result){
            res.redirect('/control/priceHike');
        })
    })
    
})

router.get('/emiOrders', function(req,res,next){
    
    Order.find({ $and:[
        {paymentStatus:'Partial'},
        {amtPending: {$ne: '0'}} 
       ] 
    }).lean()
    .exec(function(err, orders) {
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.cart.items = cart.generateArray();
        });
        console.log(orders);
        res.render('control/emiOrders', { orders: orders, csrfToken : req.csrfToken()});
    })
})

router.get('/incompleteOrders', function(req,res,next){
    Order.find({dispatchStatus:false}).lean()
    .exec(function(err, orders) {
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.cart.items = cart.generateArray();
        });
        console.log(orders);
        res.render('control/incompleteOrders', { orders: orders, csrfToken : req.csrfToken()});
    })
})

router.post('/updatePayment/:id', function(req,res,next){

    var id = req.params.id;
    var paymentReceived = req.body.amount;

    Order.findById(id, function(err, result){
        console.log(result);
        var newAmtReceived = Number(paymentReceived) + Number(result.amtReceived);
        var newAmtPending = Number(result.amtPending) - Number(paymentReceived);
        Order.updateOne({_id:id}, {$set: {amtReceived:newAmtReceived, amtPending: newAmtPending}}, function(err,ress){
            if(err){
                console.log(err);
                return res.render(control/emiOrders);
            }
            console.log(ress);
            res.redirect('/control/emiOrders');
        })
    })
})

router.get('/orderDispatched/:id', function(req,res,next){
    var id = req.params.id;
    Order.updateOne({_id:id}, {$set:{dispatchStatus:true}}, function(err,result){
        if(err){
            console.log(err);
        }
        res.redirect('/control/incompleteOrders');
    })
})

module.exports = router;