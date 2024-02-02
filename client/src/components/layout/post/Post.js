import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost, addComment } from '../../../actions/post'
import PostItem from '../posts/PostItem'
import { useParams } from 'react-router-dom';
import CommentItem from '../comment/CommentItem'


const Post = ({ getPost, addComment, post: { post, loading }, match }) => {

    const { id } = useParams();

    useEffect(() => {
        getPost(id)
    }, [getPost])

    const [text, settext] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        addComment(post._id, { text })

    }

    return (
        loading || post === null ? "Loding..." : <Fragment>
            <PostItem post={post} showActions={false} />


            <div className="post-form" onSubmit={(e) => onSubmit(e)}>
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
                {post.comments.map(comment => <CommentItem comment={comment} post={post._id}/>)}

            </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost, addComment })(Post)