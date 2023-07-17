import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/moveFavorites.css"

const MovieFavorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.imdbID !== imdbID);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  const goBack = () => {
    navigate("/");
  };

  const goToDetails = (imdbID) => {
    navigate(`/details/${imdbID}`);
  };

  if (favoriteMovies.length === 0) {
    return (
      <>
        <button className='go-back' onClick={goBack}>Go Back</button>
        <div className='fav-text'>No favorite movies yet.</div>
      </>
    );
  }

  return (
    <>
      <button className='go-back' onClick={goBack}>Go Back</button>
      <div className='fav-text'><h2>Favorite Movies</h2></div>
      <div className='favorite'>
        {favoriteMovies.map((movie) => (
          <div key={movie.imdbID} className='movie-card'>
            <div className='movie-img' onClick={() => goToDetails(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className='movie-year'>{movie.Year}</div>
            </div>
            <button className='movie-favorites' onClick={() => removeFromFavorites(movie.imdbID)}>Remove from favorites</button>
            <div className='movie-title'>{movie.Title}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieFavorite;
