const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//use expree-ejs-layout for loading 'layout.ejs' file by default-> thgis is for layout -> npm install express-ejs-layouts
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');//it is helping to automatically encrypt cookie
const  passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);//an argument(session), the express session, here it is used for storing the session cookies in DB

//using sass
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',//from where do i pick up scss file to convergt into css
    dest: './assets/css',//where i need to put my css file
    debug: true,//do i wnat to show some error when some file is not converted
    outputStyle: 'extended',//To keep file text in which format
    prefix: '/css'//where should my server should look for css file
}));

app.use(express.urlencoded({ extended: false }));//used to get encoded data due to the post request
app.use(express.static('./assets'));
app.use(expressLayout);

app.use(cookieParser());

// extract style and scripts from sub pages into the layout.ejs file otherwise the link files of css comes under head 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
//express-session
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60  * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));//middleware

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