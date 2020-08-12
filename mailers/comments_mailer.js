const nodemailer = require('../config/nodemailer');

//this is another way of exporting a method, this function is called from comment_controller.js of controller folder
exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    //this is transporter was exported from nodemailer.js --> config folder
    nodemailer.transporter.sendMail({
        from: 'testcodeial@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1>Yuup, your comment is now published</h1>'
    }, (err, info) => {
        if(err){
            console.log('error is sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}