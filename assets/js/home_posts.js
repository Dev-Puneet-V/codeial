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

                    //jquery to populate function deletePost() with the class (.delete-post-button) in newPost
                    deletePost($(' .delete-post-button', newPost));

                    //enable the functionality of th toggle like button on  the new comment
                    new ToggleLike($(' .toggle-like-button', newPost));

                    //populating function deletePost with newPost 
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
        <div>
            <img id="user-img" src=${post.user.avatar} >
            <p class="name"><b>${post.user.name}</b></p>
        </div>
        <p >${post.content}</p>
        <div style="border-bottom: 1px solid white; border-top: 1px solid white; padding: 5px; display:grid; grid-template-columns: 50% 50%">
        <span style="text-align: center;">
            <a class="toggle-like-button" data-likes="0" href="/likes/toggleLike/?id=${post._id}&type=Post">
                <i class="fa fa-2x fa-thumbs-up"></i> <span style="font-weight: bolder; font-size: larger;">0</span>
            </a>
        </span>
        <span style="text-align: center;">
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}"><i style="color: white; position: relative;  right: 100;" class="fa fa-2x fa-trash"></i></a>
                </small>
            </span>
        </div>

        <form action="/comment/create" method="Post">
            <input type="text" name="content" placeholder="Type Here To add Comment..." required>
            <input type="hidden" name="post" value='${post._id}'>
            <input type="submit" value="Add Comment">
        </form>
        Comments:<br>
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}"> 
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
                    new Noty({
                        theme: 'relax',
                        text: 'Post and associated comments deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    $(`#post-${data.data.post_id}`).remove();
                    }, error: function (error) {
                        console.log(error.responseText);
                    }
                })
        })
    }

    //convert all posts to Ajax
    let convertPostsToAjax = function(){
        $('#posts > li').each(function(){
            deletePost($(' .delete-post-button', $(this)));
            new postComments($(this).prop('id').split('-')[1]);
        })
    }

    createPost();
    convertPostsToAjax();
}