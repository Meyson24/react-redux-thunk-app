import React from 'react';
import { connect } from "react-redux";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import { logout } from "../../actions/user";

class NavbarHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        this.props.logout();
        this.props.history.push("/login");
    };

    render() {
        const { isAuthenticated } = this.props.user;
        return (
            <>
                <Navbar style={{marginBottom: "20px"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    {isAuthenticated ?
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/post">Create post</Nav.Link>
                            </Nav>
                            <Nav>
                                <Button onClick={this.logout} variant="outline-light">Logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                        : ''}
                </Navbar>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
};

const mapDispatchProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchProps)(withRouter(NavbarHeader));