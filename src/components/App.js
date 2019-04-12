import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../App.css';
import Main from './Main';
import Bookshelf from './Bookshelf';

// Clear localStorage
// localStorage.clear();
const shelf = []
const localStorageKey = 'bookFinder_bookShelf';
if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, JSON.stringify(shelf));
  }
const localBookshelf = JSON.parse(localStorage.getItem(localStorageKey));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: localBookshelf
    };
  }

  render(){
    return (
      <main>
        <Router>
          <Switch>
            <Route exact path='/' 
              render={(props) => <Main {...props} savedBooks={this.state.savedBooks} />}
            />
            <Route exact path='/bookshelf' 
              render={(props) => <Bookshelf {...props} savedBooks={this.state.savedBooks} />}
            />
          </Switch>
        </Router>
      </main>
    )
  }
}


export default App;
