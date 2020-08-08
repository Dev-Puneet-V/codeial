const mongoose = require('mongoose');

//used for file upload
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
      type: String,
      required: true  
    },
    avatar:{
        type: String
    }
}, {
    timeStamps: true //used for getting the the time at which user updated or created 
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname + '/..' + AVATAR_PATH));//where to put the file
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())//helps up to differentiate between two file with same name using timestamp
    }
  })

//static from the concept of oops, by this we will be able to acces from anywhere
userSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User', userSchema);

module.exports = User;
