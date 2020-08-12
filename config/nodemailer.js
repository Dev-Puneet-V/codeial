const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
// Only needed if you don't have a real mail account for testing
let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    // service : 'gmail',
    host : 'smtp.ethereal.email',//smtp.gmail.com
    port: '587',
    secure: false,//two factor authentication
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    //rendering ejs file or the template for mail
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),//relative path is the place from where this function is called
        data,//data tobe passed to ejs file
        function(err, template){
            if(err){console.log('error in rendering templates'); return;}
            mailHTML = template;
        }
    );
    
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}