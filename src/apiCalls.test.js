import { getMoviesData, getUSerInfo, getUSerRatings } from './apiCalls';

describe('getMoviesData', () => {
  let mockResponse = [{
    id: 29,
    title: "Ford v Ferrari",
    poster_path: "https://image.tmdb.org/t/p/original//6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original//n3UanIvmnBlH531pykuzNs4LbH6.jpg",
    release_date: "2019-11-13",
    overview: "American car designer",
    average_rating: 1,
    user_rating: 0
  }]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    getMoviesData();
    expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
  });

  it('should return an array of movies', () => {
    getMoviesData()
    .then(movies => expect(movies).toEqual(mockResponse));
  });

  it('should return an error if the response is not okay', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('200 status code not found: getMovies throw error'))
    })
    expect(getMoviesData()).rejects.toEqual(Error('200 status code not found: getMovies throw error'))
  })

});