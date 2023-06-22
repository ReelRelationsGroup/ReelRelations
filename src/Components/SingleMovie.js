import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../store";

const SingleMovie = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {singleMovie} = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchMovieById(id));
    }, [dispatch])
    
    return (

        <div>
            <h1>SINGLE MOVIE</h1>
            <h1>{singleMovie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`} />        
        </div>
    )
}

export default SingleMovie;