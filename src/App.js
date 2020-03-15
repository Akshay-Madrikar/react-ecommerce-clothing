import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './singlepages/homepage/homepage.component.jsx';
import ShopPage from './singlepages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './singlepages/sign-in-sign-up/sign-in-sign-up.component.jsx';
import CheckoutPage from './singlepages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount () {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
         setCurrentUser(
          {
              id: snapShot.id,
              ...snapShot.data()
          });
          //console.log(this.state);
        });
      } else {
        setCurrentUser( userAuth );
      }
    } )
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route exact={true} path='/checkout' component={ CheckoutPage } />
          <Route exact={true} path='/signin' render = {() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)} />
        </Switch>
      </div >
    );
  }

}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect( mapStateToProps,mapDispatchToProps )(App);
