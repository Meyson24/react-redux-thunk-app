import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from '../Post/Post';
import { loadPosts, addPost } from '../../actions'
import { Link } from 'react-router-dom';

class AllPost extends Component {

    componentDidMount() {
        if (!this.props.posts.length) this.props.onLoadPosts()
        console.log('this.props componentDidMount', this.props)
    }

    render() {
        return (
            <>
                <h1>All Posts</h1>

                {this.props.posts.length ?
                    this.props.posts.map((post) => (
                    <div key={post.id}>
                        <Post key={post.id} post={post}/>
                        <Link to={{
                            pathname: `/post/${post.id}`,
                            state: { post }
                        }}>
                            See detail
                        </Link>
                    </div>
                ))
                    : ''
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
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