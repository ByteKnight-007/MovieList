import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            
            {props.movies.map((movie) => (
                <div className="images">
                    <Link to="/"><img className="image" src={movie.Poster} alt='movie'/></Link>
                    <div onClick={() => props.handleFavouritesClick(movie)}>
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
            
        </>
        
    );
};
export default MovieList;