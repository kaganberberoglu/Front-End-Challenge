import axios from "axios";

export const DELETE_MOVIE = "DELETE_MOVIE";
export const ADD_MOVIE = "ADD_MOVIE";

export const deleteMovie = (id) => {
  id = Number(id);
  return ({ type: DELETE_MOVIE, payload: id });
}

export const addMovie = (data) => {
  return ({ type: ADD_MOVIE, payload: data });
}

export const addMovieAPI = (newMovie) => dispatch => {
  axios
    .post("https://httpbin.org/anything", newMovie)
    .then((res) => {
      dispatch(addMovie(res.data.json))
    })
    .catch((error) => console.log(error));
}

export const deleteMovieAPI = (id) => dispatch => {
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      dispatch(deleteMovie(res.data.data))
    })
    .catch((error) => console.log(error));
}
