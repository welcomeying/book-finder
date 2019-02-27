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
      query: this.search.value
    });
  }

  componentDidMount() {
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + this.state.query + "+intitle";
    console.log(this.state.url);
    fetch(this.state.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
            books: result.items.map(item => <Cards bookTitle={item.volumeInfo.title}/>)
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



  render() {
    if (this.state.query && this.state.items) {
      return (
        <div className="App">
          <header>
            BOOK FINDER
          </header>
          <div className='search-input'>
            <input type='text' name='SearchInput' ref={input => this.search = input} onChange={this.handleInputChange} />
            <button onClick={this.handleInputChange}>Search</button>
          </div>
          {this.state.items.map(item => 
            <Cards key={item.id} 
                  bookTitle={item.volumeInfo.title} 
                  bookAuthor={item.volumeInfo.authors}
                  bookPublisher={item.volumeInfo.publisher}
                  bookLink={item.volumeInfo.previewLink}
                    />)}
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <header>
            BOOK FINDER
          </header>
          <div className='search-input'>
            <input type='text' name='SearchInput' ref={input => this.search = input} />
            <button onClick={this.handleInputChange}>Search</button>
          </div>
          No Books Found
        </div>
      );
    }
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
