import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./singlepages/homepage/homepage.component.jsx'));
const ShopPage = lazy(() => import('./singlepages/shop/shop.component.jsx'));
const ContactPage = lazy(() => import('./singlepages/contact/contact.component'));
const SignInSignUpPage = lazy(() => import('./singlepages/sign-in-sign-up/sign-in-sign-up.component.jsx'));
const CheckoutPage = lazy(() => import('./singlepages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {

    useEffect(()=> {
      checkUserSession();
    }, [ checkUserSession ]);

    return (
      <div>
        <GlobalStyle />
        <Header/>
        <Switch>

          <Suspense fallback={<Spinner />}>
            <Route exact={true} path='/' component={ HomePage } />
            <Route path='/shop' component={ ShopPage } />
            <Route path='/contact' component={ ContactPage } />
            <Route exact={true} path='/checkout' component={ CheckoutPage } />
            <Route exact={true} path='/signin' render = {() => currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)} />
          </Suspense>

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