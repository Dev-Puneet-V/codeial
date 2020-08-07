class postComments {
    constructor(postId) {
        console.log("constructor");
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(` .comment-form`, this.postContainer);
        this.createComment(postId);
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            console.log("ajax");
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(self).serialize(),//this converts the form data into json
                success: function (data) {
                    console.log(data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    console.log(newComment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment Added",
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
    newCommentDom(comment) {
        return $(`<li id="comment-${comment._id}">
        <p>
             <small>
                    <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                </small>
             ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>
    </li>`)
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    new Noty({
                        theme: 'relax',
                        text: 'comment deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    $(`#comment-${data.data.commentId}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    //convert all posts to Ajax
    convertCommentsToAjax() {
        $('#posts > li').each(function () {
            deletePost($(' .delete-post-button', $(this)));
            new postComments($(this).prop('id').split('-')[1]);
        })
    }
}