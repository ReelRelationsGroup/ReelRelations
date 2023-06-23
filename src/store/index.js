import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import actorsSlice from "./actorsSlice";
import auth from './auth';
import moviesSlice from "./moviesSlice";
import singleActorSlice from "./singleActorSlice";
import singleMovieSlice from "./singleMovieSlice";
import user from './user';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    singleActor: singleActorSlice,
    singleMovie: singleMovieSlice,
    users: user,
    movies: moviesSlice,
    actors: actorsSlice
  }
});

export default store;
export * from './auth';
export * from './singleActorSlice';
export * from './singleMovieSlice';
export * from './user';
export * from './moviesSlice';
export * from './actorsSlice'