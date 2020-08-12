const nodemailer = require('../config/nodemailer');

//this is another way of exporting a method, this function is called from comment_controller.js of controller folder
exports.newComment = (comment) => {
    console.log('inside newComment mailer');
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    //this is transporter is exported from nodemailer.js --> config folder
    nodemailer.transporter.sendMail({
        from: 'testcodeial@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('error is sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}