import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchActorById, fetchFavoriteCasts, addFavoriteCast, deleteFavoriteCast } from "../store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Carousel from "./Carousel";

const SingleCast = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleActor, favoriteCasts, auth } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  const isActorInFavorites = (actorId) => {
    if (favoriteCasts.length === 0) {
      return false; 
    }
    console.log("ACTOR ID = ====== " + actorId)
    return favoriteCasts.some((actor) => {
      return actor.actorId === actorId;
    });
  };

  const handleToggleFavorite = (actorId) => {
    if (isActorInFavorites(actorId)) {
      dispatch(deleteFavoriteCast(actorId));
    } else {
      dispatch(addFavoriteCast(actorId));
    }
    dispatch(fetchFavoriteCasts());
  };

  useEffect(() => {
    dispatch(fetchActorById(id));
    dispatch(fetchFavoriteCasts());
  }, [dispatch, id]);

  if (!singleActor || !singleActor.movie_credits) {
    return (
      <>
        <h1 className="flex flex-wrap justify-center text-2xL">
          <div>
            <img
              src="https://cdn.dribbble.com/users/8805637/screenshots/16312153/media/d1dbc1c5e61313fc5c81b65f8540c8e3.gif"
              alt="Animated GIF"
            />
          </div>
          You're Lost Buddy - Actor Page Not Found
        </h1>
        <NavLink
          className="flex flex-wrap justify-center inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          to={"/"}
        >
          Return Back Home
        </NavLink>
      </>
    );
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = singleActor.movie_credits.cast.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <h1>{singleActor.name}</h1>
        {auth.username && (
          <span >
          {isActorInFavorites(singleActor.id) ? (
            <FontAwesomeIcon icon={solidHeart} onClick={() => handleToggleFavorite(singleActor.id)} />
          ) : (
            <FontAwesomeIcon icon={regularHeart} onClick={() => handleToggleFavorite(singleActor.id)}/>
          )}
        </span>
        )}
        <img
          className="w-52 h-75"
          src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`}
          alt="Actor Profile"
        />
        <h3>Born on {singleActor.birthday}</h3>
        <p>{singleActor.biography}</p>
      </div>
      <div className="w-full md:w-1/2">
        <Carousel movies={singleActor.movie_credits.cast} />
        <ul>
          {currentMovies.map((movie) => (
            <li key={movie.id}>
              {movie.title} {movie.popularity}
            </li>
          ))}
        </ul>
        <div>
          {singleActor.movie_credits.cast.length > moviesPerPage && (
            <ul>
              {Array.from(
                Array(
                  Math.ceil(
                    singleActor.movie_credits.cast.length / moviesPerPage
                  )
                ),
                (value, index) => (
                  <li key={index}>
                    <button
                      className={`pagination-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCast;
