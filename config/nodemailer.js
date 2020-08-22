const nodemailer = require('nodemailer');
const env = require('./environment');
const ejs = require('ejs');
const path = require('path');
// Only needed if you don't have a real mail account for testing
let testAccount = async () => {
   return  await nodemailer.createTestAccount();
}

let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    //rendering ejs file or the template for mail
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),//relative path is the place from where this function is called
        data,//data tobe passed to ejs file
        function(err, template){
            if(err){console.log('error in rendering templates', err); return;}
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}