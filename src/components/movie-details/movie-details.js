import React from "react";
import { Link } from "react-router-dom";
import "./movie-details.css";
import RecommendationMovies from "../recommendation-movies";

const MovieDetails = (props) => {
  let path = "";

  if (props.showPopular) {
    path = "/";
  }

  if (props.showWatched) {
    path = "/watched";
  }

  let arrGenresText = [];
  let clazz = "";

  props.genres.forEach((item) => {
    props.currentMovie.genre_ids.forEach((filmsId) => {
      if (item.id === filmsId) {
        arrGenresText.push(item.name);
      }
    });
  });

  if (props.currentMovie.vote_average >= 7) {
    clazz = "many-details";
  } else {
    clazz = "few-details";
  }

  return (
    <div>
      <div className="container">
        <Link to={path}>
          <div className="row row-arrow" onClick={props.closeMovieDetails}>
            <i className="fas fa-arrow-left"></i>
            <span className="arrow-title">Go Back</span>
          </div>
        </Link>
        <div className="row">
          <div className="col s12 m4">
            {props.currentMovie.poster_path == null ? null : (
              <img
                src={`https://image.tmdb.org/t/p/w500${props.currentMovie.poster_path}`}
                alt="card-image"
              />
            )}
          </div>
          <div className="col s12 m8">
            <div className="info-container">
              <h1 className="title-film">{props.currentMovie.title}</h1>
              <hr />
              <div className="box">
                <div className="p1">Genres:</div>
                <div className="p2">
                  {arrGenresText.map((genre, i) => {
                    return (
                      <span key={i} className="ganres">
                        {genre}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="box">
                <div className="p1">Release Date:</div>
                <div className="p2">{props.currentMovie.release_date}</div>
              </div>
              <div className="box">
                <div className="p1">Vote average:</div>
                <div className={clazz}>{props.currentMovie.vote_average}</div>
              </div>
              <div className="box">
                <div className="p1">Popularity:</div>
                <div className="p2">{props.currentMovie.popularity}</div>
              </div>
              <div className="box box-overview">
                <div className="title-overview">Overview:</div>
                <div className="value-overview">
                  {props.currentMovie.overview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <h1 className="title-recommendation">Recommended Movies</h1>
        <div className="container recommendation">
          <div className="row">
            <div className="col s130">
              {props.recommendationMovies.map((movie) => {
                return (
                  <RecommendationMovies
                    genres={props.genres}
                    genreMovie={props.currentMovie.genre_ids}
                    genreRecommendedMovie={movie.genre_ids}
                    key={movie.id}
                    movieTitle={movie.title}
                    voteAverage={movie.vote_average}
                    viewMovieDetails={props.viewMovieDetails}
                    movieId={movie.id}
                    image={movie.poster_path}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
