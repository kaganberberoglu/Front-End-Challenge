import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { AppContext } from "../AppContext";
import { addMovie } from '../actions/movieActions';


const AddMovie = () => {
    const { theme, setTheme, changeLang, setChangeLang } = useContext(AppContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [movie, setMovie] = useState({
        title: "",
        director: "",
        genre: "",
        metascore: 0,
        description: "",
    });

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addMovie(movie));
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

                        <Link to="/movies">
                            <button
                                style={{ fontWeight: "600" }}
                                className={theme ? "bg-slate-200 hover:bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800 mr-2" : "bg-slate-200 hover:bg-slate-300 rounded-md px-2 py-1 text-stone-800 mr-2"}
                            >
                                {changeLang ? "Favoriler" : "Favorites"}
                            </button>
                        </Link>

                        <button
                            style={{ fontWeight: "600" }}
                            className={theme ? "bg-slate-400 hover:text-slate-100 rounded-md px-2 py-1 text-stone-800" : "bg-slate-300 rounded-md px-2 py-1 text-stone-800"}
                        >
                            {changeLang ? "Yeni Film Ekle" : "Add New Movie"}
                        </button>
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
                            data-cy="lang-mode"
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

            <div className={theme ? "bg-slate-300 rounded-md max-w-sm mx-auto mt-4 drop-shadow-lg" : "bg-slate-100 rounded-md max-w-sm mx-auto mt-4 drop-shadow-lg"}>
                <form onSubmit={handleSubmit}>
                    <div style={{ fontWeight: "700" }} className="p-5 pb-3 border-b border-black text-lg">
                        <p>{changeLang ? "Film Ekle" : "Add Movie"}</p>
                    </div>

                    <div className="px-5 py-3">
                        <div className="py-2 drop-shadow-lg">
                            <label style={{ fontWeight: "600" }} className="block pb-1 underline">{changeLang ? "İsim" : "Title"}</label>
                            <input data-cy="film-name" value={movie.title} onChange={handleChange} name="title" type="text" placeholder="-" className="text-black rounded p-1" />
                        </div>
                        <div className="py-2 drop-shadow-lg">
                            <label style={{ fontWeight: "600" }} className="block pb-1 underline">{changeLang ? "Yönetmen" : "Director"}</label>
                            <input data-cy="director-name" value={movie.director} onChange={handleChange} name="director" type="text" placeholder="-" className="text-black rounded p-1" />
                        </div>
                        <div className="py-2 drop-shadow-lg">
                            <label style={{ fontWeight: "600" }} className="block pb-1 underline">{changeLang ? "Tür" : "Genre"}</label>
                            <input data-cy="genre" value={movie.genre} onChange={handleChange} name="genre" type="text" placeholder="-" className="text-black rounded p-1" />
                        </div>
                        <div className="py-2 drop-shadow-lg">
                            <label style={{ fontWeight: "600" }} className="block pb-1 underline">{changeLang ? "Metaskor" : "Metascore"}</label>
                            <input data-cy="metascore" value={movie.metascore} onChange={handleChange} name="metascore" type="number" className="text-black rounded p-1" />
                        </div>

                    </div>
                    <div className="px-5 py-4 border-t border-black flex justify-end gap-2">
                        <Link to={`/movies`} className="bg-zinc-500 hover:bg-zinc-600 text-slate-50 px-2 py-1 rounded-md">
                            {changeLang ? "Vazgeç" : "Cancel"}
                        </Link>
                        <button
                            data-cy="add-button"
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-slate-50 px-2 py-1 rounded-md">
                            {changeLang ? "Ekle" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default AddMovie;
