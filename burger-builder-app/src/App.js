import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurderBuilder';
// import Checkout from './containers/Checkout/Checkout';  // -> lazy loading
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// lazy loading:
const asyncCheckout = asyncComponent(() => {
  return import ('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import ('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import ('./containers/Auth/Auth');
});


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignin();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>    
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>    
      );
    }

    return (
      <div>
        <Layout>
          {routes}   
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
}

// use withRouter whenever connect() and Route co-exist
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
