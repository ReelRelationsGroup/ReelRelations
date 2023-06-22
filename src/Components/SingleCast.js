import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActorById } from "../store";

const SingleCast = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {singleActor} = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchActorById(id));
    }, [dispatch])


    
    return (

        <div>
            <h1>SINGLE ACTOR</h1>
            <h1>{singleActor.name}</h1>
            <img src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`} />
            <h3>Born on {singleActor.birthday}</h3>
            <p>{singleActor.biography}</p>          
        </div>
    )
}

export default SingleCast;