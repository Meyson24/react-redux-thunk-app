import React from "react";
import {connect} from "react-redux";

import {getPlanById} from "../../actions/plan";
import PlanItem from '../../deletedFolders/Plan/PlanItem';

class Plan extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        this.props.getPlanById(id);
    }

    getPlanById = id => {
        this.props.getPlanById(id);
    };

    render() {
        const {plan} = this.props;

        return (
            <PlanItem plan={plan}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        plan: store.plan
    }
};

const mapDispatchProps = dispatch => {
    return {
        getPlanById: (id) => dispatch(getPlanById(id))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(Plan);