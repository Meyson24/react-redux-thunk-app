import React, { Component } from 'react';
import {connect} from 'react-redux';

class PostForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.getTitle.value;
        const data = {
            id: new Date(),
            title,
            editing: false
        }

        this.props.dispatch({type:'ADD_POST', data});
        this.getTitle.value = '';
    }
    render() {
        return (
            <div>
                <h1>Create Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <input required type="text" ref={(input)=>this.getTitle = input}
                           placeholder="Enter Post Title"/>
                    <br /><br />
                    <button>Post</button>
                </form>
            </div>
        );
    }
}
export default connect()(PostForm);
