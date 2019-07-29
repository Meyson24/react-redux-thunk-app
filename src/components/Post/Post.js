import React from 'react'
import {Jumbotron, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const postStyle = {
    border: '2px solid #424242',
    margin: '5px',
}

const Post = ({post, showLinkToPost}) => (
    <Jumbotron>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>
            {showLinkToPost ?
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: `/post/${post.id}`,
                        state: {post}
                    }}>
                        <Button variant="success">
                            See detail
                        </Button>
                    </Link>
                : ""
            }
        </p>
    </Jumbotron>
    // <div style={postStyle}>
    //     <soan>{props.post.id}</span>
    //     <h2>{props.post.title}</h2>
    //     <h2>{props.post.body}</h2>
    // </div>
);

export default Post