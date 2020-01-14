import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './singlepages/homepage/homepage.component.jsx';
import ShopPage from './singlepages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './singlepages/sign-in-sign-up/sign-in-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState(
          {
            currentUser:{
              id : snapShot.id,
              ...snapShot.data()
            }
          });
          //console.log(this.state);
        });
      } else {
        this.setState({currentUser: userAuth});
      }
    } )
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route exact={true} path='/shop' component={ShopPage} />
          <Route exact={true} path='/signin' component={SignInSignUpPage} />
        </Switch>
      </div >
    );
  }

}

export default App;
