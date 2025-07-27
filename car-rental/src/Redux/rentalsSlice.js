import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URLS from '../Api.js';

export const createRentalOrder = createAsyncThunk('rentals/order', async (rentalOrder) => {
    try {
        const response = await axios.post(API_URLS.order, rentalOrder);
        return response.data;
    } catch (error) {
        console.error('Error creating rental order:', error.response ? error.response.data : error.message);
        throw error;
    }
});

export const fetchUnavailableDates = createAsyncThunk('rentals/Rentals/unavailable-dates', async () => {
    const response = await axios.get(API_URLS.unavailableDates);
    return response.data;
});

export const createPayment = createAsyncThunk('rentals/pay', async (paymentDetails) => {
    try {
        const response = await axios.post(API_URLS.pay, paymentDetails);
        return response.data;
    } catch (error) {
        console.error('Error processing payment:', error.response ? error.response.data : error.message);
        throw error;
    }
});

export const fetchRentalHistory = createAsyncThunk('rentals/history', async (userId) => {
    const response = await axios.get(API_URLS.fetchRentalHistory(userId));
    return response.data;
});

export const fetchActiveRentalsToday = createAsyncThunk('rentals/active-today', async () => {
    const response = await axios.get(API_URLS.fetchActiveRentalsToday);
    return response.data;
});

export const fetchCarsAvailability = createAsyncThunk('rentals/cars-availability', async (rentalDate,returnDate) => {
    const response = await axios.get(API_URLS.fetchCarsAvailability,rentalDate,returnDate);
    console.log(response.data); 
    return response.data;
});

const rentalsSlice = createSlice({
    name: 'rentals',
    initialState: {
        rentalOrders: [],
        unavailableDates: [],
        paymentStatus: null,
        rentalHistory: [],
        activeRentals: [],
        status: 'idle',
        error: null,
        carsAvailability: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRentalOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createRentalOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rentalOrders.push(action.payload);
            })
            .addCase(createRentalOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUnavailableDates.fulfilled, (state, action) => {
                state.unavailableDates = action.payload;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.paymentStatus = action.payload;
            })
            .addCase(fetchRentalHistory.fulfilled, (state, action) => {
                state.rentalHistory = action.payload;
            })
            .addCase(fetchActiveRentalsToday.fulfilled, (state, action) => {
                state.activeRentals = action.payload;
            })
            .addCase(fetchCarsAvailability.fulfilled, (state, action) => {
                state.carsAvailability = action.payload;
            });
    },
});

export default rentalsSlice.reducer;
