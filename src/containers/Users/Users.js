import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/user'
import UserInfo from '../../components/User/UserInfo';

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
                    <div key={user.id}>
                        <UserInfo key={user.id} user={user}/>
                    </div>))
                }
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