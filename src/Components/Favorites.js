import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCasts, fetchFavoriteMovies } from "../store";

const Favorites = () => {

    const { favoriteMovies, favoriteCasts } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteMovies());
        dispatch(fetchFavoriteCasts())
    }, [dispatch])


    return (
        <div>
            <h1>FAVORITES TAB</h1>
        </div>
    )
}

export default Favorites;