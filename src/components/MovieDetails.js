import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import "../styles/movieDetails.css"
import Loading from './Loading';

const API_KEY = "ec827be8";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
      if (movieDetails === null) {
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
          .then((res) => res.json())
          .then((data) => {
            setMovieDetails(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
}, [imdbID, movieDetails]);


  if (!movieDetails) {
    return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height: "100vh"}}><Loading/></div>
  }
  
  const goBack = () => {
    navigate("/")
  }
  return (
    <>
    <button className='go-back' onClick={goBack}>Go Back</button>
    <div className='details'>
    <div className='details-top'>
      <div className='details-img'>
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
        <div className='details-year'>{movieDetails.Year}</div>
        <div className='details-title'>{movieDetails.Title} - {movieDetails.Runtime}</div>
        <div className='details-type'>{movieDetails.Type}</div>
      </div>
      </div>
      <div className='details-bottom'>
        <div className='details-plot'><span className='details-span'>Plot: </span> <span className='details-plot-text'>{movieDetails.Plot}</span></div>
        <div className='details-plot'><span className='details-span'>Actors: </span>{movieDetails.Actors}</div>
        <div className='details-plot'><span className='details-span'>Genre: </span>{movieDetails.Genre}</div>
        <div className='details-plot'><span className='details-span'>IMBD Rating: </span>{movieDetails.imdbRating}</div>
      </div>
    </div>
    </>
  );
};

export default MovieDetails;