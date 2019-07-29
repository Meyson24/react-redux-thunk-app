import Post from '../Post/Post';
import React from "react";


class PostById extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('this.props', this.props.location.state.post)
        const post = this.props.location.state.post
        return (
            <>
                <Post showLinkToPost={false} post={post}/>
            </>
        );
    }
}

export default PostById;