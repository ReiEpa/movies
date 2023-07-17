import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/movieCard.css";
import { MdFavorite } from "react-icons/md";

const MovieCard = ({ movie, onAddToFavorites }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/details/${movie.imdbID}`);
  };

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const isMovieInFavorites = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);

    if (!isMovieInFavorites) {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      alert(`${movie.Title} has been added to favorites!`);
      onAddToFavorites();
    } else {
      alert(`${movie.Title} is already in favorites!`);
    }
  };

  return (
    <>
      <div className='movie-card'>
        <div onClick={goToDetails} className='movie-img'>
          <img src={movie.Poster} alt={movie.Poster} width="280px" />
          <div className='movie-year'>{movie.Year}</div>
        </div>
        <div className='movie-favorites' onClick={addToFavorites}>
          Add to favorites <MdFavorite />
        </div>
        <div className='movie-title'>{movie.Title}</div>
      </div>
    </>
  );
};

export default MovieCard;
