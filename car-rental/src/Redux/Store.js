import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice';
import userReducer from './userSlice.js';
import carsReducer from './carsSlice';


export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    user: userReducer,
    cars: carsReducer,
  },
});
