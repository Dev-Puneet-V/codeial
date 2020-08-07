{
    //when it will be submitted it will be received in post_controller
    //method to submit the data form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        //when the form is submitted
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),//this converts the form data into json
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts').prepend(newPost);
                    deletePost(' .delete-post-button', newPost); //populating function deletePost with newPost 
                    //noty was not able to show alert message with ajax, so it is required to use it here 
                    new Noty({
                        theme: 'relax',
                        text: "Post published",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X </a>
        </small>
        <p >${post.content}</p>
        <p class="name">${post.user.name}</p>
        <form action="/comment/create" method="Post">
            <input type="text" name="content" placeholder="Type Here To add Comment..." required>
            <input type="hidden" name="post" value='${post._id}'>
            <input type="submit" value="Add Comment">
        </form>
        Comments:<br>
        <div class="post-comments-list">
            <ul id="post-comments-${posts._id}">
                
            </ul>
        </div>
    </li>`)
    }

    // method to delete the post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    console.group(error.responseText);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}