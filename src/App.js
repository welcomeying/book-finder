import React, { Component } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value.replace(" ","+")
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      console.log(this.state.query);
      fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.state.query + "+intitle")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
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

  render() {
    let bookCards;
    let imageLinks;
    if (this.state.query && this.state.items) {
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
    else if (this.state.query && !this.state.items) {
      bookCards = 'No Book Found - Try Another Query';
    }
    else {
      bookCards = 'Nothing Here Yet - Try Searching For A Book';
    }
    return (
      <div className="App">
        <header>
          BOOK FINDER
        </header>
        <div className='search-input'>
          <input type='text' name='SearchInput' 
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
