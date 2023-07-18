import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

import "../styles/search.css";
import MovieCard from "./MovieCard";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const Search = () => {
  const {
    search,
    handleSearchClick,
    goToFav,
    numFavorites,
    movie,
    onAddToFavorites,
    handleSearch,
  } = useContext(MovieContext);

  return (
    <>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search the movie by title..."
          value={search}
          onChange={handleSearch}
        />
        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <div className="fav" onClick={goToFav}>
        <MdOutlineFavoriteBorder />
        {numFavorites > 0 && (
          <span className="num-favorites">{numFavorites}</span>
        )}
      </div>
      <div className="movies-list">
        {movie.length === 0 ? (
          <div className="fav-text">No search results.</div>
        ) : (
          movie.map((movies, index) => {
            return (
              <MovieCard
                key={index}
                movie={movies}
                onAddToFavorites={onAddToFavorites}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Search;
