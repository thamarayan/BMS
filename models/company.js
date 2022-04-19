var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user:{type: Schema.Types.ObjectId, ref:'User'},
    registeredDate: {type: Date, default: Date.now},
    name:{type:String, required:true},
    companyName:{type:String, required:true},
    address:{type:String, required:true},
    contact:{type:Number,required:true},
    email:{type:String,required:true},
    cmpnyStarted:{type:String, required:true},
    gst:{type:String, required:true},
    pan:{type:String, required:true},
    license:{type:String, required:true},
    companyStatus:{type:Boolean, default:0}   
});

module.exports = mongoose.model('Company', schema);
