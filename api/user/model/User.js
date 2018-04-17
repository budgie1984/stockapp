var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    name: {
        type:String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

var User = mongoose.model('user', UserSchema);
module.exports = User;
