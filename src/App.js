import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './singlepages/homepage/homepage.component.jsx';
import ShopPage from './singlepages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './singlepages/sign-in-sign-up/sign-in-sign-up.component.jsx';


function App () {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact={true} path='/' component={HomePage} />
        <Route exact={true} path='/shop' component={ShopPage} />
        <Route exact={true} path='/signin' component={SignInSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
