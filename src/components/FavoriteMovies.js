import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { removeFavorite } from '../actions/favoritesActions';
import { AppContext } from "../AppContext";

const FavoriteMovies = () => {
    const { changeLang, theme } = useContext(AppContext);
    const favorites = useSelector((store) => store.favoritesReducer.favorites);
    const dispatch = useDispatch();


    return (
        <div className={theme ? "bg-slate-300 drop-shadow-lg table-auto rounded-md my-4 py-1 text-center ml-2" : "bg-slate-100 drop-shadow-lg table-auto rounded-md my-4 py-1 ml-2 text-center"}>
            <p style={{ fontWeight: "700" }} className="underline decoration-2 pb-2 px-2">{changeLang ? "Favori Filmler" : "Favorite Films"}</p>
            <div>
                {
                    favorites.map(movie => (
                        <Link key={movie.id} className="flex py-0.5 px-1.5 justify-between hover:border-collapse hover:bg-slate-500 hover:text-slate-50 text-sm" to={`/movies/${movie.id}`}>
                            <p className="italic pr-3 text-left">
                                {movie.title}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(removeFavorite(movie.id))
                                }}
                                className="underline decoration-2 hover:text-red-400 font-semibold"
                            >
                                {changeLang ? "cıkar" : "remove"}
                            </button>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}


export default FavoriteMovies;
