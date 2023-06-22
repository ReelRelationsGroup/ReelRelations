import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import singleActorSlice from "./singleActorSlice";
import singleMovieSlice from "./singleMovieSlice";

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    singleActor: singleActorSlice,
    singleMovie: singleMovieSlice,
  }
});

export default store;
export * from './auth';
export * from './singleActorSlice';
export * from './singleMovieSlice';
