import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsers} from '../../actions/user'
import UserInfo from '../../components/User/UserInfo';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'default',
            methodOfSort: 'asc',
        }
    }

    componentDidMount() {
        this.onGoToPage();
    }

    onGoToPage = () => {
        this.props.getUsers();
    };

    render() {
        return (
            <>
                <h1 className="align-content-center">All Users</h1>
                {this.props.users.map((user) => (
                    <UserInfo key={user.id} user={user}>
                        <Link style={{ textDecoration: 'none' }} to={{
                            pathname: `/users/${user.id}/plan`
                        }}>

                            <Button variant="success">
                                See detail
                            </Button>
                        </Link>
                    </UserInfo>
                ))}
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        users: store.user.users,
    }
};

const mapDispatchProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers()),
    }
};

export default connect(mapStateToProps, mapDispatchProps)(Users);