import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../actions'

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', body: '', error: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const body = this.state.body;
        const data = {
            title,
            body,
            completed: false
        }

        this.props.onAddPost(data)
        this.setState({title: '', body: ''});
        this.props.history.push(`/`)
    }

    render() {
        const { title, body, error } = this.state;

        return (
            <div>
                <h1>Create Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <input required type="text" name='title' value={title} onChange={this.handleChange}
                           placeholder="Enter Post Title"/>
                    <br/><br/>
                    <input required type="text" name='body' value={body} onChange={this.handleChange}
                           placeholder="Enter Post Body"/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
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
        onAddPost: (data) => dispatch(addPost(data))
    }
}

export default connect(null, mapDispatchProps)(PostForm);
// export default connect()(PostForm);
