import React, { Component } from 'react';
import './MoviesContainer.css';
import MoviePreview from '../../Components/MoviePreview/MoviePreview';
import { connect } from 'react-redux';
import { getMovies } from '../../actions'
import { updateSelectedMovie } from '../../actions';
import { getRatings } from '../../actions';
import { getMoviesData } from '../../apiCalls';
import { getUserRatings } from '../../apiCalls';
import PropTypes from 'prop-types';


export class MoviesContainer extends Component {

  componentDidMount() {
    getMoviesData()
    .then(movies => this.props.addMoviesToStore(movies.movies))
    .catch(error => console.log(error))
  }

  findUserRating = movieId => {
    return this.props.ratings.find(rating => rating.movie_id === movieId) ? 
    this.props.ratings.find(rating => rating.movie_id === movieId).rating : 0;
  }

  saveSelectedMovieToStore = movie => {
    this.props.addSelectedMovieToStore(movie);
  }

  findUser = () => {
    return this.props.user.id ? true : false
  }

  updateUserRatings = () => {
    return !this.props.user.id ? null : (
    getUserRatings(this.props.user.id)
      .then(ratings => this.props.addUserRatings(ratings.ratings))
      .catch(error => console.log(error))
    )
    }

  render() {

    this.updateUserRatings();

    let allMovies = this.props.movies.map(movie => {
      movie.user_rating = this.props.ratings ? this.findUserRating(movie.id) : 0;
      return <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} key={movie.id} userLoggedIn={this.findUser()} movie={movie}/>
    })

    let filteredMovies = this.props.movies.filter(movie => movie.average_rating > 6.3)
    let sortedMovies = filteredMovies.sort((a, b) => b.average_rating - a.average_rating)
    let topMovies = sortedMovies.map(movie => <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} userLoggedIn={this.findUser()} key={movie.id} movie={movie}/>)

    return (
      !this.props.movies ? <p>loading</p> : (
      <section className='movies-display-container'>
        <section className='movies-heading'>
          <h3>Featured Movies</h3>
        </section>
        <section className='top-rated-movies'>
          {topMovies}
        </section>
        <section className='movies-heading'>
          <h3>All Movies</h3>
        </section>
        <section className='bottom-display-section'>
          {allMovies}
        </section>
    </section>
    ))
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  selectedMovie: state.selectedMovie,
  user: state.user,
  ratings: state.ratings
})

export const mapDispatchToProps = (dispatch) =>({
  addMoviesToStore: movies => dispatch(getMovies(movies)),
  addSelectedMovieToStore: selectedMovie => dispatch(updateSelectedMovie(selectedMovie)),
  addUserRatings: ratings => dispatch(getRatings(ratings))
})

MoviesContainer.proptype = {
  getMoviesData: PropTypes.func,
  addMoviesToStore: PropTypes.func,
  findUserRating: PropTypes.func,
  saveSelectedMovieToStore: PropTypes.func,
  findUser: PropTypes.func,
  updateUserRatings: PropTypes.func,
  movies: PropTypes.array,
  ratings: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
