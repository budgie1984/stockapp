
var User = require('../model/User');

// Create endpoint /api/user for POSTS
exports.createUser = function (req, res) {
    // Create a new instance of the user model
    var user = new User();
    // Set the user properties that came from the POST data
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log("**** User to save: ", user);
    // Save the user and check for errors
    user.save(function (err) {
      if (err)
        res.send(err);
      res.json({"data" : user });
    });
  };


exports.getUsers = function (req, res) {
    User.find({}).exec()
        .then( function (users){
            console.log(users);
            return res.json(users);
        });
};


exports.getUser = function (req, res) {
    User.findOne({ _id: req.params.id })
        .then(function(user) {
            if (user != null) {
                return res.json(user);
            }
        })
        .catch(function(err) {
            return res.json(err);
        });
};

exports.deleteUser = function (req, res) {
    console.log(req);
    User.remove({ _id: req.params.id })
        .then(function(user) {
            return res.json(user);
        })
      .catch(function(err) {
            return res.json(err);
        });
};


exports.updateUser = function(req, res) {
    User.findById(req.params.id, function (err, user) {
  
         user.name = req.body.name;
         user.username = req.body.username;
         user.email = req.body.email;
         user.password = req.body.password;

         user.save(function (err) {
             if(err) { return handleError(res, err); }
             return res.send(200, 'User updated successfully');
         });
     });
  };