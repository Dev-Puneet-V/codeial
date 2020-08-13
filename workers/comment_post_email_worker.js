const queue = require('../config/kue');

const comments_post_Mailer = require('../mailers/comments_mailer');


//every worker has process function, it tells the worker whenerver a new task is added into the queue you need to run this function
//emails are the type of queue
//this function runs whenever some data is added
queue.process('emails_post_comment', function(job, done){
    console.log('emails_post_comment worker is processing a job', job.data);
    comments_post_Mailer.newCommentPost(job.data);
    done();
});