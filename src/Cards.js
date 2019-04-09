import React, { Component } from 'react';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
    };
  }
  toggleSave = () => {
    this.setState({
      saved: !this.state.saved
    })
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
        <div className='save-book' onClick={this.toggleSave}>
        {saveIcon}
        </div> 
      </div>
    );
  }
}

export default Cards