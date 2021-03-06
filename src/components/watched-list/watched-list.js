import React from "react";
import Movie from "../movie";

const WatchedList = ({
  moviesWatched,
  movies,
  moveToWatched,
  viewMovieDetails,
  genres,
  deleteFromWatched,
}) => {
  if (moviesWatched.length === 0) {
    movies.forEach((movie) => {
      localStorage.chosenFilmsForWatched.split(",").forEach((id) => {
        if (movie.id == id) {
          moviesWatched.push(movie);
        }
      })

    })
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {moviesWatched.map((movie) => {
            return localStorage.chosenFilmsForWatched != undefined ? (
              localStorage.chosenFilmsForWatched
                .split(",")
                .some((item) => item == movie.id) ? (
                <Movie
                  deleteFromWatched={deleteFromWatched}
                  key={movie.id}
                  moveToWatched={moveToWatched}
                  movieTitle={movie.title}
                  genres={genres}
                  genreMovie={movie.genre_ids}
                  voteAverage={movie.vote_average}
                  viewMovieDetails={viewMovieDetails}
                  movieId={movie.id}
                  image={movie.poster_path}
                />
              ) : null
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchedList;
