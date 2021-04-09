import React from "react";
import Movie from "../movie";

const MovieList = ({
  movies,
  viewMovieDetails,
  genres,
  moveToWatched,
  deleteFromWatched,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {movies.map((movie) => {
            return (
              <Movie
                key={movie.id}
                moveToWatched={moveToWatched}
                deleteFromWatched={deleteFromWatched}
                movieTitle={movie.title}
                genres={genres}
                genreMovie={movie.genre_ids}
                voteAverage={movie.vote_average}
                viewMovieDetails={viewMovieDetails}
                movieId={movie.id}
                image={movie.poster_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
