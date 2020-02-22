import React, { Component } from 'react';
import './LoginForm.css';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import { getRatings } from '../../actions';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state= {email: '', password: '', error: false}
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  verifyInputs = event => {
    event.preventDefault();
    let values = Object.values(this.state);
    values.includes('') ? this.setState({error: true}) : this.completeLogin();
  }

  completeLogin = () => {
    let user = {email: this.state.email, password: this.state.password};
    this.fetchUserInfo(user);
    this.setState({email: '', password: '', error: false});
  }

  fetchUserInfo = user => {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', options)
      .then(response => response.json())
      .then(userInfo => {
        this.props.addUser(userInfo.user)
        this.getUserRatings(userInfo.user.id)
      })
      .catch(error => this.setState({error: true}))
  }

  getUserRatings = (userId) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`)
      .then(response => response.json())
      .then(ratings => this.props.addUserRatings(ratings.ratings))
      .catch(error => console.log(error))
    }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Email..."
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Password..."
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className='login-btn' onClick={this.verifyInputs}>Login</button>
        {this.state.error ? <h2 className='error-msg'>Please enter a valid email and password!</h2> : null}
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(updateUser(user)),
  addUserRatings: ratings => dispatch(getRatings(ratings))
})

export default connect(null, mapDispatchToProps)(LoginForm)
