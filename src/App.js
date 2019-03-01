import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: true
    };
  }

  handleInputChange = () => {
    let query = this.search.value.replace(" ","+")
    if (query){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            initialState: false,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
  }

  emptyResults = () => {
    this.state = {
      initialState: true
    }
  }

  render() {
    let bookCards;
    if (this.state.initialState) {
      bookCards = 'Nothing Here Yet - Try Searching For A Book';
    }
    else if (this.state.items) {
      bookCards = this.state.items.map(item => 
                  <Cards key={item.id} 
                        bookTitle={item.volumeInfo.title} 
                        bookAuthor={item.volumeInfo.authors}
                        bookPublisher={item.volumeInfo.publisher}
                        bookLink={item.volumeInfo.previewLink}
                        imageLink={item.volumeInfo.hasOwnProperty('imageLinks')?
                          item.volumeInfo.imageLinks.smallThumbnail : 
                          'http://lgimages.s3.amazonaws.com/nc-md.gif'}
                  />);
    }
    else {
      bookCards = 'No Book Found - Try Another Query';
    }
    return (
      <div className="App">
        <header>
          BOOK FINDER
        </header>
        <div className='search-input'>
          <input type='search' name='SearchInput' 
          placeholder='Search by book title or author...' 
          ref={input => this.search = input} />
          <button onClick={this.handleInputChange}>Search</button>
        </div>
        {bookCards}
      </div>
    );
  }
}

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  render() {
    return (
      <div className="book-cards">
        <img src={this.props.imageLink} alt='book'/><br/>
        {this.props.bookTitle}<br/>
        {this.props.bookAuthor}<br/>
        {this.props.bookpublisher}<br/>
        <a href={this.props.bookLink} target='_blank' rel="noopener noreferrer">Book link</a>
      </div>
    );
  }
}

export default App;
