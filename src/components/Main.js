import React, { Component } from 'react';
import Cards from './Cards';
import DarkMode from './DarkMode';
import { Route } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      initialState: true,
      loading: false,
      emptyStr: false,
      items: null
    };
  }

  handleInputChange = () => {
    this.setState({
      initialState: false,
      loading: true,
      emptyStr: false
    })
    let query = this.search.value.trim().replace(' ','+')
    if (query){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.items,
            loading: false
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            loading: false,
            error
          });
        }
      )
    }
    else {
      this.setState({
        emptyStr: true,
        loading: false,
        items: null
      })
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
    const {savedBooks} = this.props;
    // Get saved book id from savedBooks
    const localBooksId = savedBooks.map((item) => item.id);
    const darkMode = JSON.parse(localStorage.getItem('bookFinder_darkMode'));
    let bookCards;
    if (this.state.error) {
      bookCards = <div className='error'> Error: Cannot fetch data from Google Books!</div>
    }
    else if (this.state.initialState) {
      bookCards = <div className='null-notice'>Nothing Here Yet - Try Searching For A Book</div>;
    }
    else if (this.state.items) {
      bookCards = this.state.items.map(item => 
                  <Cards key={item.id} 
                        id={item.id} 
                        bookTitle={item.volumeInfo.title} 
                        bookAuthor={item.volumeInfo.hasOwnProperty('authors')?
                          item.volumeInfo.authors.join(', ') : 'Unknown'}
                        bookPublisher={item.volumeInfo.hasOwnProperty('publisher')?
                          item.volumeInfo.publisher: 'Unknown'}
                        bookLink={item.volumeInfo.previewLink}
                        imageLink={item.volumeInfo.hasOwnProperty('imageLinks')?
                          item.volumeInfo.imageLinks.smallThumbnail : 
                          './img/cover.jpeg'}
                        saved={localBooksId.indexOf(item.id) !== -1? true : false} 
                        savedBooks={savedBooks} 
                  /> );            
    }
    else if (!this.state.items && !this.state.loading) {
      bookCards = 'No Book Found - Try Another Query';
    }
    return (
      <div>
       <DarkMode darkMode={darkMode} />
        <Route render={({history}) => (
            <span className='bookshelf-link' onClick={() => { history.push('/bookshelf') }}>
              My Bookshelf
            </span>
        )} />
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
        {this.state.emptyStr && <div className='error'>Please provide a valid search query!</div>}
        {this.state.loading && <img src='./img/loading.gif' className='loading-img' alt='loading...'/>}
        <div className='book-display'>
          {bookCards}
        </div>
      </div>
    );
  }
}


export default Main;