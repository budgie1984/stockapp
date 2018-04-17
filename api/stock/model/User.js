var mongoose = require('mongoose')
    var Schema = mongoose.Schema;


    var UserSchema   = new mongoose.Schema({
      name: String,
      username: String,
      email: String,
      password: String
    });
    
    // Export the Mongoose model
    module.exports = mongoose.model('User', UserSchema);