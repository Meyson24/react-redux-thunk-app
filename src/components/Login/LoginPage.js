import React from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import {Redirect, withRouter} from "react-router";
import AllPost from "../Posts/AllPost";
import {Alert, Row, Button, Form, Col} from "react-bootstrap";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        function logout() {
            localStorage.removeItem('token');
        }

        logout()
        this.state = {
            username: '1',
            password: '123',
            loading: false,
            error: '',
            redirectToReferrer: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.persist();
        const {name, value} = e.target;
        this.setState({[name]: value});
        const {username, password} = this.state;

        // hide error if user write
        if (username && password) {
            this.setState({error: false});
            return;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            this.setState({error: true});
            return;
        }

        this.setState({loading: true});
        this.props.auth(username)
        return <Redirect to='/'/>

    }

    render() {
        const {username, password, error} = this.state;
        const {user} = this.props;

        if (this.props.user.redirectToReferrer === true) {
            return <Redirect to='/' push={true}/>
        }

        return (
            <>
                    {user.error ?
                        <Alert variant='danger'>
                            {user.error}
                        </Alert>
                        : ''
                    }

                <Col xs={4}>
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                      name="username"
                                      placeholder="Enter email"
                                      value={username}
                                      onChange={this.handleChange}/>
                        { error ? <Form.Text style={{color: "red"}} className="text">Please enter email.</Form.Text> : ''}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      name="password"
                                      placeholder="Password"
                                      value={password}
                                      onChange={this.handleChange}/>
                        {error ? <Form.Text style={{color: "red"}} className="text">Please enter password.</Form.Text> : ''}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Col>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        user: state
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        auth: (id) => dispatch(auth(id))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(withRouter(LoginPage));