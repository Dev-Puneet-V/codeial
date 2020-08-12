const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');


//every worker has process function, it tells the worker whenerver a new task is added into the queue you need to run this function
//emails are the type of queue

queue.process('emails', function(job, done){

    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);
    done();
});