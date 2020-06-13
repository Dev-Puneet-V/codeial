module.exports.profile = function(req, res){
   return res.end('<h1>Users Profile</h1>');
}

module.exports.friends = function(req, res){
   return res.end('<h1>Users Friend List</h1>')
}