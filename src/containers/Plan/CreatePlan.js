import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createPlanForUser} from '../../actions/plan'
import {CreatePlanForm} from "../../components/Plan/CreatePlanForm";


class CreatePlan extends Component {

    handleSubmit = plan => {
        const {userId} = this.props.match.params;
        const params = {userId, ...plan};

        this.props.createPlan(params);
        this.props.history.push(`/users/${userId}`)
    };

    render() {
        return (
            <CreatePlanForm handleSubmit={this.handleSubmit}/>
        )
    }
}

const mapDispatchProps = dispatch => {
    return {
        createPlan: (params) => dispatch(createPlanForUser(params))
    }
};

export default connect(null, mapDispatchProps)(CreatePlan);