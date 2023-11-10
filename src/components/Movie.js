import React, { useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import FavoriteMovies from "./FavoriteMovies.js";
import { toggleFavorites, addFavorite, removeFavorite } from "../actions/favoritesActions";
import { deleteMovie } from '../actions/movieActions';
import { AppContext } from "../AppContext";

const Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { theme, setTheme, changeLang, setChangeLang } = useContext(AppContext);
    const movies = useSelector((store) => store.movieReducer.movies);
    const displayFavorites = useSelector((store) => store.favoritesReducer.displayFavorites);
    const movie = movies.find(movie => movie.id === Number(id));

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch(deleteMovie(id));
        dispatch(removeFavorite(movie.id));
        navigate("/movies");
    }

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
                        <Link to="/movies">
                            <button
                                className={theme ? "bg-slate-200 hover:bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800 mr-2" : "bg-slate-200 hover:bg-slate-300 rounded-md px-2 py-1 text-stone-800 mr-2"}
                                style={{ fontWeight: "600" }}
                            >
                                {changeLang ? "Tüm Filmler" : "All Movies"}
                            </button>
                        </Link>

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


            <div className="flex flex-col max-w-sm mx-auto">
                {displayFavorites && <FavoriteMovies />}
                <div>
                    <div style={{ fontWeight: "700" }} className="p-5 pb-3 border-b border-black text-lg">
                        <p>{movie.title} & {changeLang ? "Detayları" : "Details"}</p>
                    </div>
                    <div className="px-5">
                        <div className="py-1 flex justify-between">
                            <div style={{ fontWeight: "600" }}>{changeLang ? "İsim" : "Title"}</div>
                            <div className="italic">{movie.title}</div>
                        </div>
                        <div className="py-1 flex justify-between">
                            <div style={{ fontWeight: "600" }}>{changeLang ? "Yönetmen" : "Director"}</div>
                            <div className="italic">{movie.director}</div>
                        </div>
                        <div className="py-1 flex justify-between">
                            <div style={{ fontWeight: "600" }}>{changeLang ? "Tür" : "Genre"}</div>
                            <div className="italic">{movie.genre}</div>
                        </div>
                        <div className="py-1 flex justify-between">
                            <div style={{ fontWeight: "600" }}>{changeLang ? "Metaskor" : "Metascore"}</div>
                            <div className="italic">{movie.metascore}</div>
                        </div>
                        <div className="py-1 flex justify-between flex-col">
                            <div style={{ fontWeight: "600" }}>{changeLang ? "Açıklama" : "Description"}</div>
                            <div className="italic">{changeLang ? movie.descriptionTurk : movie.description}</div>
                        </div>
                    </div>
                    <div className="px-5 py-3 border-t border-black flex justify-end gap-2">
                        <button
                            data-cy="delete-button"
                            onClick={handleRemove}
                            type="button"
                            className="bg-red-400 hover:bg-red-500 text-slate-50 px-2 py-1 rounded-md"
                            style={{ fontWeight: "500" }}
                        >
                            {changeLang ? "Sil" : "Delete"}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(addFavorite(movie));
                                navigate("/movies");
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-slate-50 px-2 py-1 rounded-md"
                            style={{ fontWeight: "500" }}
                        >
                            {changeLang ? "Favorilere Ekle" : "Add to Favorites"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;
