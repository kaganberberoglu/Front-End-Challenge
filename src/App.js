import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MovieList from "./components/MovieList.js";
import Movie from "./components/Movie.js";
import AddMovie from "./components/AddMovie.js";
import { AppContext } from './AppContext';
import useLocalStorage from "./useLocalStorage.js";

const App = () => {
  const [theme, setTheme] = useLocalStorage("Night Mode", false);
  const [changeLang, setChangeLang] = useLocalStorage("Language", false);

  return (
    <AppContext.Provider value={{ theme, setTheme, changeLang, setChangeLang }}>
      <div>
        <Routes>
          <Route path="/movies" element={
            <MovieList />
          }
          />
          <Route path="/movies/:id" element={
            <Movie />
          }
          />
          <Route path="/movies/add" element={
            <AddMovie />
          }
          />
          <Route path="/" element={
            <Navigate to="/movies" />
          }
          />
        </Routes>
      </div>
    </AppContext.Provider >
  );
}

export default App;
