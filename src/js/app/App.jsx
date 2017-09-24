import React, { Component } from 'react';
import Footer from '../footer';
import List from '../list';
import Search from '../search';
import Result from '../result';
import Film from '../film';
import mockSearchResults from './mockSearchResults';
import './style.sass';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      film: null,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ results: mockSearchResults });
  }

  handleSelectFilm = (id) => {
    this.setState({ film: this.state.results.find(item => item.show_id === id) });
    window.scrollTo(0, 0);
  }

  handleClearFilm = () =>
    this.setState({ film: null });

  render() {
    return (
      <div className="app">
        <div className="app__container">
          {
            this.state.film
              ? (
                <Film
                  film={this.state.film}
                  onClearFilm={this.handleClearFilm}
                />
              ) : <Search onSearch={this.handleSearch} />
          }
          <Result
            results={this.state.results}
            film={this.state.film}
          />
          <List
            results={this.state.results}
            film={this.state.film}
            onSelectFilm={this.handleSelectFilm}
          />
          <Footer />
        </div>
      </div>
    );
  }
}
