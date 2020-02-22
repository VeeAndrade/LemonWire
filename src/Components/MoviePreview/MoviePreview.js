import React from 'react';
import { Link } from 'react-router-dom';
import './MoviePreview.css';

const MoviePreview = ({ date, movie, user, saveSelectedMovieToStore  }) => {
  return (
    <article onClick={ () => saveSelectedMovieToStore(movie) } className='movie-preview-container'>
      <p>{date}</p>
      <div className='ratings'>
        <p className='preview-rating'>{movie.average_rating}</p>
        {movie.user_rating ? <p className='preview-rating'>{movie.user_rating}</p> : <Link to={!user ? '/login' : `/movies/${movie.id}`} className='preview-rating-button'>Rate</Link>}
      </div>
      <Link to={`/movie_details`}><img src={movie.poster_path} alt='movie poster' className='movie-poster-image'/></Link>
    </article>
  )
}

export default MoviePreview;
