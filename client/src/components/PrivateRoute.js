import React from 'react';

import { connect } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

function PrivateRoute(props) {
    if (props.auth.isAuthenticated) {
        return (
            <Dashboard />
        )
    } else {
        return (
            <Login />
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.auth
});


export default connect(mapStateToProps)(PrivateRoute);