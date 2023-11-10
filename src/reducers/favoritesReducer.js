import { toast } from 'react-toastify';

import { TOGGLE_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/favoritesActions';

const initialState = {
  favorites: [],
  displayFavorites: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      const newFav = {
        title: action.payload.title,
        id: action.payload.id,
      }
      if (!state.favorites.find((mov) => mov.id === newFav.id)) {
        return {
          ...state,
          favorites: [...state.favorites, newFav],
        }
      } else {
        toast.warn("Uuuppps!")
      }

    // eslint-disable-next-line
    case TOGGLE_FAVORITES:
      return {
        ...state,
        displayFavorites: !state.displayFavorites,
      }

    case REMOVE_FAVORITE:
      const filteredFavorite = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
      const filteredNewFavorite = {
        ...state,
        favorites: filteredFavorite,
      };
      return filteredNewFavorite;

    default:
      return state;
  }
}

export default reducer;
