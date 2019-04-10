import React, { Component } from 'react';

const shelf = []
const localStorageKey = 'bookFinder_bookShelf';
if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, JSON.stringify(shelf));
  }
const localBookshelf = JSON.parse(localStorage.getItem(localStorageKey));

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      savedBooks: localBookshelf
    };
  }
  handleSave = () => {
    this.setState({
      saved: !this.state.saved
    })
    if (this.state.saved) {
      let newBook = {
        image: this.props.imageLink,
        title: this.props.bookTitle,
        author: this.props.bookAuthor,
        publisher: this.props.bookPublisher,
        bookLink: this.props.bookLink
      }
      let savedBooks = this.state.savedBooks;
      savedBooks.push(newBook);
      localStorage.setItem(localStorageKey,JSON.stringify(savedBooks));
      this.setState({
        savedBooks: savedBooks
      })


    }
  }
  render() {
    let saveIcon = this.state.saved?<span>&#9733;</span>:<span>&#9734;</span>;
    return (
      <div className='book-card'>
        <div className='book-cover'>
          <img className='book-img' src={this.props.imageLink} alt={this.props.bookTitle} />
        </div>
        <div className='book-info'>
          <div className='book-title'>{this.props.bookTitle}</div>
          <div className='book-author'>By: {this.props.bookAuthor}</div>
          <div className='book-publisher'>Published By: {this.props.bookPublisher}</div>
          <a href={this.props.bookLink} target='_blank' rel='noopener noreferrer'>
          <button className='book-link'>See this Book</button></a>
        </div>
        <div className='save-book' onClick={this.handleSave}>
        {saveIcon}
        </div> 
      </div>
    );
  }
}

export default Cards