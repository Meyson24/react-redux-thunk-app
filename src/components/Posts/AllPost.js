import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from '../Post/Post';
import { loadPosts, sortByParameterAndMethod } from '../../actions'
import { Link } from 'react-router-dom';
import SortPanel from "./SortPanel";
import {ButtonGroup, Button, Col, Row} from "react-bootstrap";

class AllPost extends Component {
    constructor(props) {
        super(props);

        this.state = {isActive: 'default', methodOfSort: 'asc', id: '', title: '', body: ''}
    }

    componentDidMount() {
        if (!this.props.posts.length) this.props.onLoadPosts()
    }

    // sort(parameter) {
    //     let methodOfSort = this.state.methodOfSort === 'asc' ? 'desc' : 'asc';
    //     this.setState({methodOfSort: methodOfSort, isActive: parameter})
    //     this.props.sortByParameterAndMethod(this.props.posts, parameter, methodOfSort)
    // }
goToPostById = () => {

}
    sort = (parameter) => {
        const methodOfSort = this.state.methodOfSort === 'asc' ? 'desc' : 'asc';
        this.setState({methodOfSort: methodOfSort, isActive: parameter})
        this.props.sortByParameterAndMethod(this.props.posts, parameter, methodOfSort)
    }

    render() {
        return (
            <>
                <h1>All Posts</h1>
                {/*<SortPanel sort={this.sort} isActive={this.state.isActive}/>*/}
                <Row className="justify-content-md-end">
                <Col style={{marginBottom: '20px'}} xs={4}>
                    <h4 className="center">Sort: {this.state.isActive} {this.state.methodOfSort}</h4>
                    <ButtonGroup>
                        <Button onClick={(e) => this.sort('id', e)} className={this.state.isActive === 'default' ? 'active' : ''} variant="outline-dark">Default</Button>
                        <Button onClick={(e) => this.sort('id', e)} className={this.state.isActive === 'id' ? 'active' : ''} variant="outline-dark">ID</Button>
                        <Button onClick={(e) => this.sort('title', e)} className={this.state.isActive === 'title' ? 'active' : ''} variant="outline-dark">Title</Button>
                        <Button onClick={(e) => this.sort('body', e)} className={this.state.isActive === 'body' ? 'active' : ''} variant="outline-dark">Description</Button>
                    </ButtonGroup>
                </Col>
                </Row>
                {this.props.posts.length ?

                    this.props.posts.map((post) => (
                    <div key={post.id}>
                        <Post key={post.id} post={post} showLinkToPost={true}/>
                        {/*<Link to={{*/}
                        {/*    pathname: `/post/${post.id}`,*/}
                        {/*    state: { post }*/}
                        {/*}}>*/}
                        {/*    See detail*/}
                        {/*</Link>*/}
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
        onLoadPosts: () => dispatch(loadPosts()),
        sortByParameterAndMethod: (posts, param, method) => dispatch(sortByParameterAndMethod(posts, param, method)),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(AllPost);