import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCasts } from "../store";

const FavoriteCasts = () => {

    const { favoriteMovies, favoriteCasts } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteCasts());
    }, [dispatch])


    return (
        <div>
            <h1>FAVORITES Casts</h1>
        </div>
    )
}

export default FavoriteCasts;