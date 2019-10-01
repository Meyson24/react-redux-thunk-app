import React from 'react'
import {Jumbotron, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const UserInfo = ({children, user}) => {
    return(
        <Jumbotron>
            <h4>{user.email}</h4>
            <span>{user.first_name}</span><br/>
            <span>{user.last_name}</span>
            {children}
        </Jumbotron>
    );

};

export default UserInfo