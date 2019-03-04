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
    let query = this.search.value.replace(' ','+')
    if (query){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`)
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

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleInputChange();
    }
  }

  emptyResults = () => {
    this.setState = {
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
                        bookAuthor={item.volumeInfo.hasOwnProperty('authors')?
                          item.volumeInfo.authors.join(', ') : 'Unknown'}
                        bookPublisher={item.volumeInfo.hasOwnProperty('publisher')?
                          item.volumeInfo.publisher: 'Unknown'}
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
      <div className='App'>
        <header>
          BOOK FINDER
        </header>
        <div>
          <input className='search-input' type='search' name='SearchInput' 
          placeholder='Search by book title or author...' 
          ref={input => this.search = input}
          onKeyPress={this._handleKeyPress} />
          <button className='search-btn' onClick={this.handleInputChange}>Search</button>
        </div>
        <div className='book-display'>
          {bookCards}
        </div>
      </div>
    );
  }
}

class Cards extends Component {
  render() {
    return (
      <div className='book-card'>
        <img className='book-img' src={this.props.imageLink} alt={this.props.bookTitle} />
        <div className='book-info'>
          <div className='book-title'>{this.props.bookTitle}</div>
          <div className='book-author'>By: {this.props.bookAuthor}</div>
          <div className='book-publisher'>Published By: {this.props.bookPublisher}</div>
          <a href={this.props.bookLink} target='_blank' rel='noopener noreferrer'>
          <button className='book-link'>See this Book</button></a>
        </div>  
      </div>
    );
  }
}

export default App;
