import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import user from '../auth/user';

class AuthorizedContainer extends Component {
  componentWillMount() {
    if (user.isAuthenticated === null) {
      this.props.history.push('/');
      return;
    }
    this.props.history.push('/inventory');
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/inventory" component={Inventory} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(AuthorizedContainer);
