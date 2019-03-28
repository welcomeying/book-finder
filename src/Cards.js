import React, { Component } from 'react';

class Cards extends Component {
  render() {
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
      </div>
    );
  }
}

export default Cards