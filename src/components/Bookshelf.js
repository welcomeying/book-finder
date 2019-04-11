import React, { Component } from 'react';
import Cards from './Cards'

// Clear localStorage
// localStorage.clear();
const shelf = []
const localStorageKey = 'bookFinder_bookShelf';
if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, JSON.stringify(shelf));
  }
const localBookshelf = JSON.parse(localStorage.getItem(localStorageKey));

const bookCards = localBookshelf.map(item => 
                  <Cards key={item.id} 
                        id={item.id} 
                        bookTitle={item.title} 
                        bookAuthor={item.author}
                        bookPublisher={item.publisher}
                        bookLink={item.bookLink}
                        imageLink={item.image}
                        saved={true}
                  />);
class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <h2>My Bookshelf</h2>
        <div className='book-display'>
          {bookCards}
        </div>

      </div>
    );
  }
}

export default Bookshelf
