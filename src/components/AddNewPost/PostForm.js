import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../actions'
import {Form, Button, Col} from "react-bootstrap";

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', body: '', error: false};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.persist();

        const {name, value} = e.target;

        this.setState({[name]: value});

        const {title, body} = this.state;

        // hide error if user write
        if (title && body) {
            this.setState({error: false});
            return;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {title, body} = this.state;

        if (!(title && body)) {
            this.setState({error: true});
            return;
        }

        const data = {
            title,
            body
        }

        this.props.onAddPost(data)
        this.setState({title: '', body: ''});
        this.props.history.push(`/`)
    }

    render() {
        const {title, body, error} = this.state;

        return (
            <div>
                <h1>Create Post</h1>
                <Col xs={4}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                          name="title"
                                          placeholder="Enter Title"
                                          value={title}
                                          onChange={this.handleChange}/>
                            {error ?
                                <Form.Text style={{color: "red"}} className="text">Please enter title.</Form.Text> : ''}
                        </Form.Group>

                        <Form.Group controlId="formBody">
                            <Form.Label>Body</Form.Label>
                            <Form.Control type="text"
                                          name="body"
                                          placeholder="Enter body"
                                          value={body}
                                          onChange={this.handleChange}/>
                            {error ?
                                <Form.Text style={{color: "red"}} className="text">Please enter body.</Form.Text> : ''}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                {/*<form onSubmit={this.handleSubmit}>*/}
                {/*    <input required type="text" name='title' value={title} onChange={this.handleChange}*/}
                {/*           placeholder="Enter Post Title"/>*/}
                {/*    <br/><br/>*/}
                {/*    <input required type="text" name='body' value={body} onChange={this.handleChange}*/}
                {/*           placeholder="Enter Post Body"/>*/}
                {/*    <br/><br/>*/}
                {/*    <input type="submit" value="Submit"/>*/}
                {/*</form>*/}
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
