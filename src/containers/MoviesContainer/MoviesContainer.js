import React, { Component } from 'react';
import './MoviesContainer.css';
import MoviePreview from '../../Components/MoviePreview/MoviePreview';
import { connect } from 'react-redux';
import { getMovies } from '../../actions'

class MoviesContainer extends Component {

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => {
        console.log(movies.movies)
        this.props.addMoviesToStore(movies.movies)})
      .catch(error => console.log(error))
  }

  formatDate(releaseDate) {
     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = releaseDate.split('-')
    return `${monthNames[date[1] - 1]} ${date[2]}, ${date[0]}`;
  }

  render() {
    if (!this.props.movies) {
      return  <p>loading</p>
    }
    let allMovies = this.props.movies.map(movie => {
      return <MoviePreview key={movie.id} date={this.formatDate(movie.release_date)} movie={movie}/>})
    let sortedMovies = this.props.movies.sort((a, b) => {
      return a.average_rating - b.average_rating
    })
    let topMovies = sortedMovies.map(movie => {
    return <MoviePreview key = {movie.id} movie = {movie}/>
  })
    return (
      <section className='movies-display-container'>
          <section className='movies-heading'>
            <h3>Highy Rated Movies</h3>
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
    )
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) =>({
  addMoviesToStore: movies => dispatch(getMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
