import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/search.css";
import MovieCard from './MovieCard';
import { MdOutlineFavoriteBorder } from "react-icons/md";

const API_URL = "http://www.omdbapi.com/?s=";
const API_KEY = "ec827be8";

const Search = () => {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [numFavorites, setNumFavorites] = useState(0);

  const navigate = useNavigate();

  const fetchData = () => {
    const searchTerm = search.trim() || "joker";
    fetch(`${API_URL}${searchTerm}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.Search || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setNumFavorites(storedFavorites.length);
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const goToFav = () => {
    navigate("/favorites");
  };

  const onAddToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setNumFavorites(storedFavorites.length);
  };

  return (
    <>
      <div className='search-box'>
        <input
          className='search-input'
          type='text'
          placeholder='Search the movie by title...'
          value={search}
          onChange={handleSearch}
        />
        <button className='search-btn' onClick={handleSearchClick}>Search</button>
      </div>
      <div className='fav' onClick={goToFav}>
        <MdOutlineFavoriteBorder />
        {numFavorites > 0 && <span className='num-favorites'>{numFavorites}</span>}
      </div>
      <div className='movies-list'>
        {movie.length === 0 ? (
          <div className='fav-text'>No search results.</div>
        ) : (
          movie.map((movies, index) => {
            return (
              <MovieCard key={index} movie={movies} onAddToFavorites={onAddToFavorites} />
            );
          })
        )}
      </div>
    </>
  );
};

export default Search;
