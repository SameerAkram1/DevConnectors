import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../../actions/post'
import userimg from '../../../img/userimg.png'

const CommentItem = ({ comment, auth: { user }, post, deleteComment }) => {


    return (
        <div class="comments">
            <div class="post bg-white p-1 my-1">
                <div>
                    <a href="profile.html">
                        <img
                            class="round-img"
                            src={userimg}
                            alt=""
                        />
                        <h4>{comment.name}</h4>
                    </a>
                </div>
                <div>
                    <p class="my-1">
                        {comment.text}
                    </p>
                    <p class="post-date">
                        {comment.date}
                    </p>
                </div>

                {user._id == comment.user ? (<button style={{ color: 'red' }} onClick={e => deleteComment(post, comment._id)}>Delete</button>) : ''}

            </div>
        </div >
    )
}


CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth

})

export default connect(mapStateToProps, { deleteComment })(CommentItem)