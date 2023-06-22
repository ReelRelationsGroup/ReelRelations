import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActorById } from "../store";
import Carousel from "./Carousel";

const SingleCast = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleActor } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchActorById(id));
  }, [dispatch]);

  if (!singleActor || !singleActor.movie_credits) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>SINGLE ACTOR</h1>
      <Carousel movies={singleActor.movie_credits.cast} />
      <h1>{singleActor.name}</h1>
      <img
        className="w-52 h-75"
        src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`}
        alt="Actor Profile"
        />

      <h3>Born on {singleActor.birthday}</h3>
      <p>{singleActor.biography}</p>
    </div>
  );
};

export default SingleCast;
