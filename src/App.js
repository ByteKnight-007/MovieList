import React, { useEffect, useState } from "react";
import AboutMovi from './components/AboutMovi'
import "./App.css";
import AddFavourites from "./components/AddFavourites";
import SearchBox from "./components/SearchBox";
import MovieListHeading from "./components/MovieListHeading";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieList from "./components/MovieList";
// import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=e323b2`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  //correct the file name
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-list-favourites")
    );
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-list-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    if (favourites.indexOf(movie) === -1) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    // <div >
    // 	<div className='center'>
    //
    // 	<div >
    // 		<MovieListHeading heading='SearchFlix' />
    // 		<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    // 	</div>
    // 	<div className='movie-list' >
    // 		<MovieList
    // 			movies={movies}
    // 			handleFavouritesClick={addFavouriteMovie}
    // 			favouriteComponent={AddFavourites}
    // 		/>
    // 	</div>
    // 	</div>
    // 	<div >
    // 		<MovieListHeading className="favourite-text" heading='WATCHLIST' />
    // 	</div>
    // 	<div className="movie-list">
    // 		<MovieList
    // 			movies={favourites}
    // 			handleFavouritesClick={removeFavouriteMovie}
    // 			favouriteComponent={RemoveFavourites}
    // 		/>
    // 	</div>
    // </div>

    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <>
                <div className="center">
                  <div>
                    <MovieListHeading heading="SearchFlix" />
                    <SearchBox
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
                  </div>
                  <div className="movie-list">
                    <MovieList
                      movies={movies}
                      handleFavouritesClick={addFavouriteMovie}
                      favouriteComponent={AddFavourites}
                    />
                  </div>
                </div>
                <div>
                  <MovieListHeading
                    className="favourite-text"
                    heading="WATCHLIST"
                  />
                </div>
                <div className="movie-list">
                  <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                  />
                </div>
              </>
            );
          }}
        >
        </Route>
		<Route exact path="/movie/:id" render = {()=>{
              <AboutMovi />
		}}>  
          </Route>
      </Switch>
    </Router>
  );
};

export default App;

// state = database ;

// tasks = [];

// [movies, setMovies] = useState();

// useEffect(function(){​​​​​​​
// fetch("https://dog.ceo/api/breeds/image/random")
//  .then((response) => {
// ​​​​​​​ returnresponse.json()
//  }​​​​​​​)
//  .then(movies=> {​​​​​​​

// console.log(movies)
// setMovies(movies);
//  }​​​​​​​);

// }​​​​​​​,[])

//empty, variable - state
// // setTimeout(function(){​​​​​​​
// // console.log('test')
// // }​​​​​​​, 10000)
