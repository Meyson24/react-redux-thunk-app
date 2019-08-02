import React from 'react';
import { connect } from "react-redux";
import { auth, logout } from "../../actions/user";
import { Redirect, withRouter } from "react-router";
import { Alert, Button, Form, Col } from "react-bootstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.logout();
        // function logout() {
        //     localStorage.removeItem('token');
        // }

        // logout()
        this.state = {
            username: 'fusion',
            password: 'fusion',
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

        let credentials = JSON.stringify({
            username,
            password
        });

        this.props.auth(credentials);
        return this.props.history.push('/')
    }

    render() {
        const {username, password, error} = this.state;

        const {user} = this.props;
        console.log('this.props.user', this.props.user)
        if (this.props.user.isAuthenticated) {
            return <Redirect to="/"/>
        }

        // if (this.props.user.redirectToReferrer) {
        //     return <Redirect to='/' push={true}/>
        // }

        return (
            <>
                {user.errorOfAuthenticated ?
                    <Alert variant='danger'>
                        {user.errorOfAuthenticated}
                    </Alert>
                    : ''
                }

                <Col xs={4}>
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text"
                                      name="username"
                                      placeholder="Enter email"
                                      value={username}
                                      onChange={this.handleChange}
                        />
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

const mapStateToProps = (store) => {
    console.log('store', store)
    return {
        user: store.user
    }
};

const mapDispatchProps = (dispatch) => {
    return {
        auth: (id) => dispatch(auth(id)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchProps)(withRouter(Login));