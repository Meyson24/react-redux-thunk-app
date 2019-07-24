import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import EditComponent from './EditComponent';
import {loadPosts} from './actions'

class AllPost extends Component {

    componentDidMount() {
        this.props.onLoadPosts()
    }

    render() {
        return (
            <div>
                <h1>All Posts</h1>
                {this.props.posts.map((post) => (
                    <div key={post.id}>
                        {post.editing ? <EditComponent post={post} key={post.id}/> :
                            <Post key={post.id} post={post}/>}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        onLoadPosts: () => dispatch(loadPosts())
    }
}

export default connect(mapStateToProps, mapDispatchProps)(AllPost);