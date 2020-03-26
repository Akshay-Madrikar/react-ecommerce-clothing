import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './singlepages/homepage/homepage.component.jsx';
import ShopPage from './singlepages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import ContactPage from './singlepages/contact/contact.component';
import SignInSignUpPage from './singlepages/sign-in-sign-up/sign-in-sign-up.component.jsx';
import CheckoutPage from './singlepages/checkout/checkout.component';
import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';


const App = ({ checkUserSession, currentUser }) => {

    useEffect(()=> {
      checkUserSession();
    }, [ checkUserSession ]);

    return (
      <div>
        <GlobalStyle />
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route path='/contact' component={ ContactPage } />
          <Route exact={true} path='/checkout' component={ CheckoutPage } />
          <Route exact={true} path='/signin' render = {() => currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)} />
        </Switch>
      </div >
    );
};

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);