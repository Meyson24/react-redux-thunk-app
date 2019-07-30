import Post from '../Post/Post';
import React from "react";

class PostById extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const book = this.props.location.state.book
        return (
            <>
                <Post showLinkToBook={false} book={book}/>
            </>
        );
    }
}

export default PostById;