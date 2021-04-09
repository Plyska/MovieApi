import React from "react";
import "./movie.css";

const Movie = ({
  image,
  viewMovieDetails,
  movieId,
  movieTitle,
  voteAverage,
  genres,
  genreMovie,
  moveToWatched,
  deleteFromWatched,
}) => {
  let arrGenresText = [];
  let title = "";
  let clazz = "";

  genres.forEach((item) => {
    genreMovie.forEach((filmsId) => {
      if (item.id === filmsId) {
        arrGenresText.push(item.name);
      };
    });
  });

  if (arrGenresText.length >= 5) {
    arrGenresText.pop();
  };

  for (let i = 0; i < movieTitle.length; i++) {
    if (i <= 40) {
      title += movieTitle[i];
    } else {
      title += "...";
      break;
    };
  };
  
  if (voteAverage >= 7) {
    clazz = "many";
  } else {
    clazz = "few";
  };
  
  return (
    <div className="col s12 m6 l3">
      <div className="card" onClick={() => viewMovieDetails(movieId)}>
        <div className="card-image waves-effect waves-block waves-light">
          {image == null ? null : (
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/w500${image}`}
              alt="card image"
            />
          )}
        </div>
        <div className="card-content">
          <div className="title">{title}</div>
          <div className={clazz}>{voteAverage}</div>
        </div>
        <div className="box-genres">
          {arrGenresText.map((genre, i) => {
            return (
              <span key={i} className="genres">
                {genre}
              </span>
            );
          })}
        </div>
        <div className="controls">
          {localStorage.chosenFilmsForWatched != undefined ? (
            localStorage.chosenFilmsForWatched
              .split(",")
              .some((item) => item == movieId) ? (
              <button
                className="btn"
                data-id={movieId}
                onClick={(e) => deleteFromWatched(e)}
              >
                delete from watched
              </button>
            ) : (
              <button
                onClick={(e) => moveToWatched(e)}
                className="btn"
                data-id={movieId}
              >
                Add to watched
              </button>
            )
          ) : (
            <button
              onClick={(e) => moveToWatched(e)}
              className="btn"
              data-id={movieId}
            >
              Add to watched
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
