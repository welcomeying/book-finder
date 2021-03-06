import React, { Component } from 'react';

const localBookshelf = 'bookFinder_bookShelf';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: this.props.saved,
      savedBooks: this.props.savedBooks
    };
  }

  toggleSave = () => {
    this.setState({
      saved: !this.state.saved
    }, ()=> {
      this.handleSave();
    })
  }

  handleSave = () => {
    let savedBooks = this.state.savedBooks;
    let currentBook = {
        id: this.props.id,
        image: this.props.imageLink,
        title: this.props.bookTitle,
        author: this.props.bookAuthor,
        publisher: this.props.bookPublisher,
        bookLink: this.props.bookLink
      }
    if (this.state.saved) {
      let duplicate = false;
      for (let i = 0; i < savedBooks.length; i++) {
        if (savedBooks[i].id === currentBook.id) {
          duplicate = true;
          break;
        }
      }
      if (!duplicate) {
        savedBooks.push(currentBook);
        localStorage.setItem(localBookshelf, JSON.stringify(savedBooks));
        this.setState({
          savedBooks: savedBooks
        })
      }
    }
    else {
      for (let i = 0; i < savedBooks.length; i++) {
        if (savedBooks[i].id === currentBook.id) {
          savedBooks.splice(i, 1);
          localStorage.setItem(localBookshelf, JSON.stringify(savedBooks));
          this.setState({
            savedBooks: savedBooks
          })
          break;
        }
      }
    }
  }
  render() {
    let saveIcon = this.state.saved?
      <div><span className='save-star'>&#9733;</span>
      <span class="tooltiptext">Remove from Bookshelf</span></div>:
      <div><span className='save-star'>&#9734;</span>
      <span class="tooltiptext">Save to Bookshelf</span></div>;
    return (
      <div className='book-card'>
        
          <img className='book-img' src={this.props.imageLink} alt={this.props.bookTitle} />
        
        <div className='book-info'>
          <div className='book-title'>{this.props.bookTitle}</div>
          <div className='book-author'>By: {this.props.bookAuthor}</div>
          <div className='book-publisher'>Published By: {this.props.bookPublisher}</div>
          <a href={this.props.bookLink} target='_blank' rel='noopener noreferrer'>
          <button className='book-link'>See this Book</button></a>
          <div className='save-book' onClick={this.toggleSave}>
          {saveIcon}
          </div> 
        </div>
      </div>
    );
  }
}

export default Cards