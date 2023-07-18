import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
export const MovieContext = createContext(null);
const API_URL = "http://www.omdbapi.com/?s=";
const API_KEY = "ec827be8";

export const MovieContextProvider = ({ children }) => {
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
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
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
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setNumFavorites(storedFavorites.length);
  };

  const contextValue = {
    search,
    setSearch,
    movie,
    setMovie,
    numFavorites,
    setNumFavorites,
    handleSearch,
    handleSearchClick,
    goToFav,
    onAddToFavorites,
  };
  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
