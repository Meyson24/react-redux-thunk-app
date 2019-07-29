import React from 'react';
import {Navbar, Nav, FormControl, Button, Form} from 'react-bootstrap';
import {Redirect, withRouter} from "react-router-dom";

class NavbarHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push("/login");
    }

    render() {
        const isAuthorized = localStorage.getItem('token');
        return (
            <>
                <Navbar style={{marginBottom: "20px"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    {isAuthorized ?
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

export default withRouter(NavbarHeader);


// const Header = () => (
//     <>
//         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Navbar.Brand href="/">Home</Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
//             <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto">
//                     <Nav.Link href="/post">Create post</Nav.Link>
//                 </Nav>
//                 <Nav>
//                     <Button onClick={this.logout} variant="outline-light">Logout</Button>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     </>
// );
//
// const AuthHeader = ({isLoggedIn}) => {
//     if (isLoggedIn) {
//         return (<Header/>);
//     }
//     return (<div></div>);
// }
//
// export default AuthHeader;