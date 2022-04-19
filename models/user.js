var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    name:{type:String,required:true},
    companyApplied:{type:Boolean, default:0},
    companyApproved:{type:Boolean,default:0}
});


userSchema.methods.encryptPassword = function(password){
    const salt = bcrypt.genSaltSync(saltRounds);
    return hash = bcrypt.hashSync(password, salt);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);