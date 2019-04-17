import React, { Component } from 'react';
import Cards from './Cards';
import DarkMode from './DarkMode';
import { Route } from 'react-router-dom';

class Bookshelf extends Component {
  render() {
    const {savedBooks} = this.props;
    let bookCards;
    if (savedBooks.length === 0) {
      bookCards = <div className='null-notice'>Bookshelf is empty - Try Searching For A Book</div>;
    }
    else {
      bookCards = savedBooks.map(item => 
                  <Cards key={item.id} 
                        id={item.id} 
                        bookTitle={item.title} 
                        bookAuthor={item.author}
                        bookPublisher={item.publisher}
                        bookLink={item.bookLink}
                        imageLink={item.image}
                        saved={true}
                        savedBooks={savedBooks}
                  />);}
    return (
      <div>
        <DarkMode />
        <Route render={({history}) => (
            <span className='main-link' onClick={() => { history.push('/') }}>
              Back to search
            </span>
        )} />
        <h2>My Bookshelf</h2>
        <div className='book-display'>
          {bookCards}
        </div>

      </div>
    );
  }
}

export default Bookshelf
