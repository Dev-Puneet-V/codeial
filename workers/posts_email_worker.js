const queue = require('../config/kue');

const postsMailer = require('../mailers/posts_mailers');


//every worker has process function, it tells the worker whenerver a new task is added into the queue you need to run this function
//emails are the type of queue
//this function runs whenever some data is added
queue.process('post_emails', function(job, done){

    console.log('emails worker is processing a job', job.data);
    
    postsMailer.newPosts(job.data);
    done();
});