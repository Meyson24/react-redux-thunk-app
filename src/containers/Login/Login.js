import React from 'react';
import {connect} from "react-redux";
import {auth, checkAuth, logout} from "../../actions/user";
import {withRouter} from "react-router";
import {Alert, Button, Form, Col} from "react-bootstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'example@example.com',
            password: '123456',
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
        const {email, password} = this.state;

        if (email && password) {
            this.setState({error: false});
            return;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;

        if (!(email && password)) {
            this.setState({error: true});
            return;
        }

        let credentials = JSON.stringify({
            email,
            password
        });

        await this.props.auth(credentials);
        await this.props.checkAuth();

        this.props.history.push('/')
    }

    render() {
        const {email, password, error} = this.state;
        const {currentUser} = this.props;

        return (
            <>
                {currentUser.errorOfAuthenticated ?
                    <Alert variant='danger'>
                        {currentUser.errorOfAuthenticated}
                    </Alert>
                    : ''
                }
                <Col xs={4}>
                    <h2>Login</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          name="email"
                                          placeholder="Enter email"
                                          value={email}
                                          onChange={this.handleChange}
                            />
                            {error ?
                                <Form.Text style={{color: "red"}} className="text">Please enter email.</Form.Text> : ''}
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          name="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={this.handleChange}/>
                            {error ? <Form.Text style={{color: "red"}} className="text">Please enter
                                password.</Form.Text> : ''}
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

const mapStateToProps = store => {
    return {
        currentUser: store.user.currentUser
    }
};

const mapDispatchProps = dispatch => {
    return {
        auth: (id) => dispatch(auth(id)),
        checkAuth: () => dispatch(checkAuth()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchProps)(withRouter(Login));