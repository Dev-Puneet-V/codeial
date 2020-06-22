const User = require('../models/user');


module.exports.profile = function(req, res){
   
   if(req.cookies.user_id){
     User.findById(req.cookies.user_id, function(err, user){
      if(user){
         return res.render('user_profile',{
            title: "User Profile",
            user: user
         })
      }
      return res.redirect('/users/sign-in');
     });
   }else{
      return res.redirect('/users/sign-in');
   }
}

//render the signup page
module.exports.signUp = function(req, res){
   return res.render('user_sign_up',{
      title: "User SignUp"
   });
}

//render the signin page
module.exports.signIn = function(req, res){
   return res.render('user_sign_in',{
      title: "User SignIn"
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
            return res.redirect('/users/sign-in');
         });
      }else{
         return res.redirect('back');
      }
   });
}


//sign in and create a session for user
module.exports.createSession = function(req, res){
   ///find the user
   User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing in'); return;}

      //handle user found

      if(user){

         //handle password which doesn't match
         if(user.password != req.body.password){
            return res.redirect('back');
         }else{
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
         }
      }
      else{
         //handle user not found

         return res.redirect('back');
      }
   });
}