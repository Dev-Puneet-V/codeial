const mongoose = require('mongoose');

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
    }
}, {
    timeStamps: true //used for getting the the time at which user updated or created 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
