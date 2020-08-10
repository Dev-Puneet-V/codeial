const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
   User.findById(req.params.id, function(err, user){
      return res.render('user_profile',{
         title: "Profile",
         profile_user: user
      });
   });
  
}

//render the signup page
module.exports.signUp = function(req, res){
   //check if user is already signed in, if it is so then just show the users profile
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_up',{
      title: "User SignUp"
   });
}

//render the signin page
module.exports.signIn = function(req, res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_in',{
      title: "User SignIn",
      user: req.body
   });
}

//get the signup data
module.exports.create = function(req, res){
   console.log(req.body);
   if(req.body.password != req.body.confirm_password){
      console.log("wrong password");
      return res.redirect('back');
   }
   User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing up'); return;}
      if(!user){
         //data saved in db is according to schema
         User.create(req.body, function(err, user){
            if(err){ console.log("error in creating user"); return;}
            console.log('user created')
            req.flash('success', 'User Successfully Created');
            return res.redirect('/users/sign-in');
         });
      }else{
         req.flash('User Already Exists');
         console.log("user already exists")
         return res.redirect('back');
      }
   });
}


//sign in and create a session for user
module.exports.createSession = function(req, res){
   req.flash('success', 'Logged in Successfully');
   return res.redirect('/');
}


module.exports.destroySession = function(req, res){
   req.logout();
   req.flash('success', 'You have logged out!');//this message is to be passed to response
   return res.redirect('/');
}

module.exports.update = async function(req, res){
   if(req.user.id == req.params.id){
      try{
         // await User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
         //    req.flash('success', 'Data Updated');
         //    // return res.redirect('/');
         // });
         let user = await User.findById(req.params.id);
         //this is static function defined in models user.js which used multer to update things
         User.uploadAvatar(req, res, function(err){
            if(err){
               console.log("*****Multer Error", err);
               return res.redirect('back');
            }
            user.name = req.body.name;
            user.email = req.body.email;
            //if file is uploaded
            if(req.file){
               //deleting old image before uploading new image
               if(user.avatar){
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar));
               }
               //it is saving the path of the uploaded file into avatar field in the user
               user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
         });
      }catch(err){
         req.flash('error', err);
         return res.redirect('back');
      }
   }else{
      req.flash('error', 'Unauthorized');
      res.status(401).send('unauthorized');
   }
}
