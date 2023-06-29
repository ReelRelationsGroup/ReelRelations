import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteMovies } from "../store";

const FavoriteMovies = () => {

    const { favoriteMovies, favoriteCasts } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteMovies());
    }, [dispatch])


    return (
        <div>
            <h1>FAVORITES Movies</h1>
        </div>
    )
}

export default FavoriteMovies;