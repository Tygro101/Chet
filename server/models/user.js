var mongoose = require("mongoose");
var bcrypt   = require("bcrypt");

var Schema   = mongoose.Schema;
var userSchema = mongoose.Schema({
    local:{
        username: String,
        password: String,
        isEnteredBefore: Boolean
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
    
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('User', userSchema);

