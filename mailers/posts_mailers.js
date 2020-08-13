const nodemailer = require('../config/nodemailer');

//this is another way of exporting a method, this function is called from comment_controller.js of controller folder
exports.newPosts = (post) => {
    console.log('inside newPost mailer');
    let htmlString = nodemailer.renderTemplate({post: post}, '/posts/posts_mailer.ejs');
    //this is transporter is exported from nodemailer.js --> config folder
    nodemailer.transporter.sendMail({
        from: 'testcodeial@gmail.com',
        to: post.user.email,
        subject: "New Post Published",
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