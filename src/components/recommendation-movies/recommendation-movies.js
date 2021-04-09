import React from "react";
import "./recommendation-movies.css";

const RecommendationMovies = ({
  image,
  movieTitle,
  voteAverage,
  genres,
  genreRecommendedMovie,
}) => {
  let arrGenresText = [];
  let clazz = "";

  if (voteAverage >= 7) {
    clazz = "many";
  } else {
    clazz = "few";
  };

  genres.forEach((item) => {
    genreRecommendedMovie.forEach((filmsId) => {
      if (item.id === filmsId) {
        arrGenresText.push(item.name);
      };
    });
  });

  if (arrGenresText.length >= 5) {
    arrGenresText.pop();
  };
  
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          {image == null ? null : (
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/w500${image}`}
              alt="card image"
            />
          )}
        </div>
        <div className="card-content recommendation">
          <div className="title">{movieTitle}</div>
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
        <div className="controls"></div>
      </div>
    </div>
  );
};

export default RecommendationMovies;
