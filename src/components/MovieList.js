import React from 'react';
import './MovieList.css';


const movies = [
    {title: "Pulp Fiction", rating: 9.5},
    {title: "Star Wars", rating: 8},
];

function MovieList() {
    console.log('MovieList component rendered');
    return (
        <div className='movie-box'>
            <h2>Movies</h2>
            <ul>
                {movies.map((movie, i) => (
                    <li key = {i}>
                        {movie.title} - IMDb Rating: {movie.rating}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;