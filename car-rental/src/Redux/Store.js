import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    user: userReducer,
  },
});
