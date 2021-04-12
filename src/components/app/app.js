import React, { Component } from "react";
import Navbar from "../navbar";
import SearchArea from "../searchArea";
import MovieList from "../movie-list";
import Pagination from "../pagination";
import MovieDetails from "../movie-details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WatchedList from "../watched-list";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      watchedMovies: [],
      searchTerm: "",
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      showPopularMovieList: true,
      genres: [],
      recommendationMovies: [],
    };
    this.apiKey = "573f0420d5d47830c0592ee519cc5184";
  }

  getGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          genres: data.genres,
        });
      });
  };

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          movies: [...data.results],
          totalResults: data.total_pages,
        });
      });

    this.getGenres();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchTerm && this.state.searchTerm != " ") {
      this.setState({
        showPopularMovieList: false,
      });

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({
            movies: [...data.results],
            totalResults: data.total_results,
          });
        });
    } else {
      this.setState({
        showPopularMovieList: true,
      });

      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({
            movies: [...data.results],
            totalResults: data.total_pages,
          });
        });
    }
  };

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  nextPage = (pageNumber) => {
    if (pageNumber === 0) {
      pageNumber = 1;
    }

    let url = "";
    if (this.state.showPopularMovieList) {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`;
    } else {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`;
    }
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          movies: [...data.results],
          currentPage: pageNumber,
        });
      });
  };

  viewMovieDetails = (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          recommendationMovies: data.results,
        });
      });

    const filteredMovie = this.state.movies.filter((movie) => movie.id == id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
  };

  closeMovieDetails = () => {
    this.setState({ currentMovie: null });
  };

  moveToWatched = (event) => {
    event.stopPropagation();
    let chosenFilmsForWatched = [];

    if (
      localStorage.chosenFilmsForWatched &&
      localStorage.chosenFilmsForWatched.length != 0
    ) {
      chosenFilmsForWatched = [
        ...localStorage.chosenFilmsForWatched.split(","),
      ];
    }

    chosenFilmsForWatched.push(event.target.dataset.id);
    localStorage.setItem(
      "chosenFilmsForWatched",
      chosenFilmsForWatched
    );

    let watchedMovies = [...this.state.watchedMovies];
    this.state.movies.forEach((movie) => {
      if (movie.id == event.target.dataset.id) {
        watchedMovies.push(movie);
        console.log(watchedMovies);
      } else {
        console.log("123");
      }
    });

    this.setState({
      watchedMovies: watchedMovies,
    });
  };

  deleteFromWatched = (event) => {
    event.stopPropagation();

    const index = localStorage.chosenFilmsForWatched
      .split(",")
      .findIndex((item) => item == event.target.dataset.id);

    const newArr = localStorage.getItem("chosenFilmsForWatched").split(",");
    newArr.splice(index, 1);
    localStorage.setItem("chosenFilmsForWatched", newArr);

    let indx = this.state.watchedMovies.findIndex(
      (movie) => movie.id == event.target.dataset.id
    );

    this.state.watchedMovies.splice(indx, 1);

    this.setState({
      watchedMovies: this.state.watchedMovies,
    });
  };

  render() {
    return (
      <Router className="app">
        <Navbar />
        <Switch>
          <Route exact path="/">
            {this.state.currentMovie === null ? (
              <div>
                <SearchArea
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                />
                <MovieList
                  moveToWatched={this.moveToWatched}
                  deleteFromWatched={this.deleteFromWatched}
                  viewMovieDetails={this.viewMovieDetails}
                  movies={this.state.movies}
                  genres={this.state.genres}
                />
              </div>
            ) : (
              <MovieDetails
                genres={this.state.genres}
                recommendationMovies={this.state.recommendationMovies}
                closeMovieDetails={this.closeMovieDetails}
                currentMovie={this.state.currentMovie}
                viewMovieDetails={this.viewMovieDetails}
              />
            )}

            {this.state.totalResults > 20 && this.state.currentMovie == null ? (
              <Pagination
                nextPage={this.nextPage}
                currentPage={this.state.currentPage}
              />
            ) : (
              ""
            )}
          </Route>
          <Route path="/watched">
            <WatchedList
              state={this.state}
              movies={this.state.watchedMovies}
              moveToWatched={this.moveToWatched}
              deleteFromWatched={this.deleteFromWatched}
              viewMovieDetails={this.viewMovieDetails}
              genres={this.state.genres}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
