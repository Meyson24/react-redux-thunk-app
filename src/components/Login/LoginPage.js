import React from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import {Redirect, withRouter} from "react-router";
import AllPost from "../Posts/AllPost";
import { Alert, Row } from "react-bootstrap";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        function logout() {
            // remove user from local storage to log user out
            localStorage.removeItem('token');
            // return <Redirect to='/login'/>
        }

        logout()
        this.state = {
            username: '123',
            password: '123',
            submitted: false,
            loading: false,
            error: '',
            redirectToReferrer: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password, returnUrl} = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({loading: true});
        this.props.auth(username)
        return <Redirect to='/'/>

    }

    render() {
        const {username, password, submitted, loading, error} = this.state;
        const {user} = this.props;
        if (this.props.user.redirectToReferrer === true) {
            return <Redirect to='/' push={true}/>
        }
        return (
            <>
                <Row>
                    {user.error ?
                        <Alert variant='danger'>
                            {user.error}
                        </Alert>
                        : ''
                    }
                </Row>

                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (user.error ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username}
                               onChange={this.handleChange}/>
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (user.error ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {/*{loading &&*/}
                        {/*<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />*/}
                        {/*}*/}
                    </div>
                    {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
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