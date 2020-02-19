import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Link } from 'react-router-dom';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import LoginForm from '../LoginForm/LoginForm'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => this.setState({movies: movies.movies}))
      .catch(error => console.log(error))
  }

  render() {
    return(
      <main>
        <Route exact path="/">
          {this.state.movies.length ?
          <MoviesContainer movies={this.state.movies}/>
          : <p>Error</p>
          }
      </Route>
      <Route exact path="/login">
        <img src={process.env.PUBLIC_URL + '/images/clapper.png'} alt="Clapperboard icon" className="clapper" />
        <LoginForm />
        <h2 className='login-msg'>Get your ratings on.</h2>
      </Route>
      </main>
    )
  }
}
export default App;
