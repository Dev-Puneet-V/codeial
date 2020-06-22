const express = require('express');
const app = express();
const port = 8000;

const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"))
//use express router
app.use('/', require('./routes'));//middleware

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//Start server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);//this is called interpolation, writing variabe inside string
        return;
    }

    console.log(`Server is running on port: ${port}`);
});

// case sensitive routing - Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
// app.set('case sensitive routing', true);