import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {
  
	state = {
		query : '',
	}

	updateQuery = (query) => {
		this.setState({query: query.trim() })
	}

	render() {
		let showingBooks
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showingBooks = this.props.bookStore.filter((book) => match.test(book.author) || match.test(book.title))
			
		} else {
			showingBooks = []
		}
		return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" className="close-search" >Close</Link>
				<div className="search-books-input-wrapper">
					{/*
						NOTES: The search from BooksAPI is limited to a particular set of search terms.
						You can find these search terms here:
						https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

						However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
						you don't find a specific author or title. Every search is limited by search terms.
					*/}
					<input 
						type="text" 
						placeholder="Search by title or author"
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>

				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
					{showingBooks.map((book) => (
										<li>
											<Book book={book}/>
										</li>
					))}
			</ol>
				
			</div>
		</div>
		)
		
	}
	
}

export default SearchBook