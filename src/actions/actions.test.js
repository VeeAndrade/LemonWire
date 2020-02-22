import * as actions from '../actions'

describe('actions', () => {
  it('should have a type GET_MOVIES', () => {
    const movies = [{
      id: 21,
      title: "Sonic the Hedgehog",
      poster_path: "https://image.tmdb.org/t/p/original//aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original//tCUcf3oNWMW8kwAj3WC6CvIN5ah.jpg",
      release_date: "2020-02-12",
      overview: "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
      average_rating: 7
    }]

    const expectedAction = {
      type: 'GET_MOVIES',
      movies
    }
    const result = actions.getMovies(movies)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of UPDATE_USER', () => {
    const user = {
        id: 1,
        name: "Alan",
        email: "alan@turing.io"
    }
    const expectedAction = {
      type: 'UPDATE_USER',
      user
    }
    const result = actions.updateUser(user)
    
    expect(result).toEqual(expectedAction)
  });

  it('should have a type of UPDATE_SELECTED_MOVIE', () => {
    const movie = {
      id: 21,
      title: "Sonic the Hedgehog",
      poster_path: "https://image.tmdb.org/t/p/original//aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original//tCUcf3oNWMW8kwAj3WC6CvIN5ah.jpg",
      release_date: "2020-02-12",
      overview: "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
      average_rating: 7
    };
    const expectedAction = {
      type: 'UPDATE_SELECTED_MOVIE',
      movie
    };
    const result = actions.updateSelectedMovie(movie);

    expect(result).toEqual(expectedAction);
  })

})
