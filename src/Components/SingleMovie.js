import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchMovieById } from "../store";

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleMovie } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  return !singleMovie.title ? (
    <>
      <h1 className="flex flex-wrap justify-center text-2xL">
        <div>
          <img
            src="https://cdn.dribbble.com/users/8805637/screenshots/16312153/media/d1dbc1c5e61313fc5c81b65f8540c8e3.gif"
            alt="Animated GIF"
          />
        </div>
        You're Lost Buddy - Movie Not Found
      </h1>
      <NavLink
        className="flex flex-wrap justify-center inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        to={"/"}
      >
        Return Back Home
      </NavLink>
    </>
  ) : (
    <div>
      <h1>SINGLE MOVIE</h1>
      <h1>{singleMovie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`}
        alt="Movie Poster"
      />
    </div>
  );
};

export default SingleMovie;
