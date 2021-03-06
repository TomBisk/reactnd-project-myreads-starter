import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {
	state = {
		query: '',
		searchedBooks: []
	}

	updateQuery = (query) => {
		this.setState({query})
		this.currentSearch(query)
	}

	currentSearch = (query) => {
		if (query) {
			BooksAPI.search(query).then((searchedBooks) => {
				searchedBooks.error ? this.setState({searchedBooks: [] }) : this.setState({searchedBooks: searchedBooks})
			})} else {
				this.setState({searchedBooks: [] })
			}
	}
	
	render() {
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
		this.state.searchedBooks.filter((book) => match.test(book.authors) || match.test(book.title))	
		} else {
			this.setState.searchedBooks = []
		}
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search" >Close</Link>
					<div className="search-books-input-wrapper">
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
						{this.state.searchedBooks.map((newBook) => {
						 let shelf = "none"
						 this.props.myBooks.map(book => ( 
							book.id === newBook.id ? shelf = book.shelf : ''))
							return (
								<li key={newBook.id}>
									<Book 
										book={newBook} 
										moveBook={this.props.moveBook}
										currentShelf={shelf}
									/>
								</li>
							)
						})}
					</ol>	
				</div>
			</div>
		)	
	}
}

export default SearchBook