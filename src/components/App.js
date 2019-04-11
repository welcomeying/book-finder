import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../App.css';
import Main from './Main';
import Bookshelf from './Bookshelf';

const App = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/bookshelf' component={Bookshelf}/>
        </Switch>
      </Router>
    </main>
  )
}


export default App;
