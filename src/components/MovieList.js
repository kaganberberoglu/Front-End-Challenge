import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import FavoriteMovies from "./FavoriteMovies.js";
import { toggleFavorites } from "../actions/favoritesActions";
import { AppContext } from "../AppContext";

const MovieList = () => {
    const { theme, setTheme, changeLang, setChangeLang } = useContext(AppContext);
    const movies = useSelector((store) => store.movieReducer.movies);
    const displayFavorites = useSelector((store) => store.favoritesReducer.displayFavorites);

    const dispatch = useDispatch();

    return (
        <div>
            <div className={theme ? "flex flex-row items-center justify-center bg-slate-300 w-full drop-shadow-lg py-2 px-4" : "flex flex-row items-center justify-center bg-slate-100 w-full drop-shadow-lg py-2 px-4"}>
                <div className="flex flex-col mr-10">
                    <center>
                        <img className="w-28 h-auto rounded-full drop-shadow-lg pb-1" src={require("../assets/1.png")} alt="logo" />
                        <h1 className="text-stone-800 text-2xl" style={{ fontWeight: "600" }}><Link to="/">CineCorn</Link></h1>
                    </center>
                </div>
                <div>
                    <div className="flex flex-row items-center justify-center drop-shadow">
                        <button
                            className={theme ? "bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800 mr-2" : "bg-slate-300 rounded-md px-2 py-1 text-stone-800 mr-2"}
                            style={{ fontWeight: "600" }}
                        >
                            {changeLang ? "Tüm Filmler" : "All Movies"}
                        </button>

                        <button
                            style={{ fontWeight: "600" }}
                            className={theme ? "bg-slate-200 hover:bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800 mr-2" : "bg-slate-200 hover:bg-slate-300 rounded-md px-2 py-1 text-stone-800 mr-2"}
                            onClick={() => dispatch(toggleFavorites())}
                        >
                            {changeLang ? displayFavorites ? "Favorileri Göster" : "Favorileri Gizle" : displayFavorites ? "Show Favorites" : "Hide Favorites"}
                        </button>

                        <Link to="/movies/add">
                            <button
                                style={{ fontWeight: "600" }}
                                className={theme ? "bg-slate-200 hover:bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800" : "bg-slate-200 hover:bg-slate-300 rounded-md px-2 py-1 text-stone-800"}
                            >
                                {changeLang ? "Yeni Film Ekle" : "Add New Movie"}
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-row pt-3 justify-end items-center">
                        <DarkModeSwitch
                            data-cy="dark-mode"
                            moonColor="#292524"
                            sunColor="#292524"
                            size={30}
                            checked={theme}
                            onClick={(e) => {
                                e.preventDefault();
                                setTheme(!theme);
                            }}
                        />

                        <button
                            style={{ fontWeight: "600" }}
                            className={theme ? "bg-slate-200 hover:bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800 ml-2" : "bg-slate-200 hover:bg-slate-300 rounded-md px-2 py-1 text-stone-800 ml-2"}
                            onClick={(e) => {
                                e.preventDefault();
                                setChangeLang(!changeLang);
                            }}
                        >
                            {changeLang ? "TR" : "EN"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center">
                {displayFavorites && <FavoriteMovies />}
                <div className="grid justify-items-start pt-4 px-2">
                    <table className={theme ? "bg-slate-300 drop-shadow-lg table-auto rounded-md border-collapse text-left w-full" : "bg-slate-100 drop-shadow-lg table-auto rounded-md border-collapse text-left w-full"}>
                        <thead>
                            <tr>
                                <th className="pl-4 pt-1 pb-1 underline decoration-2">{changeLang ? "İsim" : "Title"}</th>
                                <th className="pl-4 pt-1 pb-1 underline decoration-2">{changeLang ? "Tür" : "Genre"}</th>
                                <th className="pl-4 pt-1 pb-1 underline decoration-2">{changeLang ? "Metaskor" : "Metascore"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => {
                                return (
                                    <tr className="hover:border-collapse hover:bg-slate-500 hover:text-slate-50" key={movie.id}>
                                        <td className="pl-4 italic">{movie.title}</td>
                                        <td className="pl-4 italic">{movie.genre}</td>
                                        <td className="pl-4 text-center">{movie.metascore}</td>
                                        <td className="p-1.5">
                                            <Link to={`/movies/${movie.id}`} style={{ fontWeight: "600" }} className="mr-2 bg-slate-400 rounded-md py-0.5 px-2 drop-shadow-lg">
                                                {changeLang ? "Detaylar" : "Details"}   
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={theme ? "bg-slate-300 drop-shadow-lg table-auto rounded-md p-4 my-4 w-full" : "bg-slate-100 drop-shadow-lg table-auto rounded-md p-4 my-4 w-full"}>
                        <span style={{ fontWeight: "700" }}>{movies.length}</span> <span className="italic">{changeLang ? "Film Gösteriliyor" : "Movies Showing"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieList;
