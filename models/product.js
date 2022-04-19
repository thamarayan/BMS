var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type:String, required:true},
    title: {type:String, required:true},
    description: {type:String, required:true},
    actualPrice: {type:Number, required:true},
    discountPrice:{type:Number, required:true},
    mainCategory:{type:String, required:true},
    subCategory1:{type:String, required:true},
    subCategory2:{type:String, required:true},
    madeIn:{type:String},
    condition:{type:String, default:'New'},
    estimatedDelivery:{type:String},
    installation:{type:String, default:'Not Required'},
    warranty:{type:String},
    brand:{type:String},
    packingCharge:{type:Number},
    shippingCharge:{type:Number},
    availability:{type:Boolean, default:1},
    inDemand:{type:Boolean,default:0},
    newArrival:{type:Boolean, default:0},
    hikedPrice:{type:Boolean, default:false},
    oldPrice:{type:Number, default:0},   
});

module.exports = mongoose.model('Product', schema);