import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
  }
});

export default store;
export * from './auth';

