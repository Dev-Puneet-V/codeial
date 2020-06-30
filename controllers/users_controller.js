const User = require('../models/user');


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
            return res.redirect('/users/sign-in');
         });
      }else{
         console.log("user already exists")
         return res.redirect('back');
      }
   });
}


//sign in and create a session for user
module.exports.createSession = function(req, res){
   req.flash('success', 'Logged in Successfully');
   return res.redirect('/')
}


module.exports.destroySession = function(req, res){
   req.logout();
   req.flash('success', 'You have logged out!');//this message is to be passed to response
   return res.redirect('/');
}

module.exports.update = function(req, res){
   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
         return res.redirect('/');
      });
   }else{
      res.status(401).send('unauthorized');
   }
}