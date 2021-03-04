import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn()
  }
  render() {
    return (
      <div>
      <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.checkAuthState())
  }
};

export default connect(null, mapDispatchToProps) (App);
