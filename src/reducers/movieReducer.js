import { ADD_MOVIE, DELETE_MOVIE } from '../actions/movieActions';
import data from '../data.js';

const initialState = {
  movies: data,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MOVIE:
      const filteredMovie = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      const filteredState = {
        ...state,
        movies: filteredMovie,
      };
      return filteredState;

    case ADD_MOVIE:
      let newMovie = action.payload;
      newMovie = { ...newMovie, id: Date.now() };
      const newMovies = [...state.movies, newMovie];
      return {
        ...state,
        movies: newMovies,
      }

    default:
      return state;
  }
}

export default reducer;
