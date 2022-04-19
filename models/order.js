var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    
    user:{type:Schema.Types.ObjectId, ref:'User'},
    orderDate: {type: Date, default: Date.now},
    name:{type:String, required:true},
    companyName:{type:String, required:true},
    deliveryAddress:{type:String, required:true},
    contact:{type:Number,required:true},
    email:{type:String,required:true},
    cart:{type:Object, required:true},
    paymentType:{type:String,required:true},
    amtReceived:{type:String,required:true},
    amtPending:{type:String},
    paymentStatus:{type: String},
    dispatchStatus:{type: Boolean, default:0},
    cancelStatus:{type:Boolean, default:0},   
});

module.exports = mongoose.model('Order', schema);
