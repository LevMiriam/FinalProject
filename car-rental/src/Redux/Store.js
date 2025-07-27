import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice';
import userReducer from './userSlice';
import carsReducer from './carsSlice';


export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    user: userReducer,
    cars: carsReducer,
  },
});
