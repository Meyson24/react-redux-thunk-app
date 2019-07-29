import React from 'react'

const postStyle = {
    border: '2px solid #424242',
    margin: '5px',
}

const Post = props => (
    <div style={postStyle}>
        <soan>{props.post.id}</soan>
        <h2>{props.post.title}</h2>
        <h2>{props.post.body}</h2>
    </div>
);

export default Post