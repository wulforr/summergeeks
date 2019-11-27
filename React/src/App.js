import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CheckInForm from './CheckInForm'
import { Route, Switch, HashRouter } from "react-router-dom";
import CheckOutForm from './CheckOutForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Entry Manager
          <HashRouter>
          <Switch>
          <Route exact path="/" render = {props => (<CheckInForm />)} />
          <Route exact path="/checkout" render = {props => (<CheckOutForm />)} />
          </Switch>
          </HashRouter>
      </header>
    </div>
  );
}

export default App;
