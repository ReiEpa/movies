import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Search from './components/Search'
import "./App.css"
import MovieDetails from './components/MovieDetails'
import MovieFavorite from './components/MovieFavorite'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Search />}/>
      <Route path='/details/:imdbID' element={<MovieDetails />}/>
      <Route path='/favorites' element={<MovieFavorite />} />
    </Routes>
    </Router>
  )
}

export default App