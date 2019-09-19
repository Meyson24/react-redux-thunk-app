import React from 'react'
import {Jumbotron, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const UserInfo = ({user}) => (
    <Jumbotron>
        <h4>{user.email}</h4>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>

        <Link style={{ textDecoration: 'none' }} to={{
            pathname: `/users/${user.id}`
        }}>
            <Button variant="success">
                See detail
            </Button>
        </Link>

    </Jumbotron>
);

export default UserInfo