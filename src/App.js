import React from 'react';
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


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount () {

    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //      setCurrentUser(
    //       {
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     });
    //   } else {
    //     setCurrentUser( userAuth );
    //   }
    // } )
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <GlobalStyle />
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route path='/contact' component={ ContactPage } />
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

export default connect(mapStateToProps)(App);