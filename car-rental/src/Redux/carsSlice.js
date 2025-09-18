
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import API_URLS from '../Api.js';

// export const getAllCars = createAsyncThunk('cars/fetchCars', async (filters, { getState }) => {
//     const state = getState();
//     const token = state.user.token; 

//     try {
//         const response = await axios.get(API_URLS.cars, {
//             params: filters,
//             headers: { Authorization: `Bearer ${token}` } // הוספת הטוקן לכותרות
//         });
//         console.log('Response from API:', response);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching cars:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// });

// export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (id) => {
//     const response = await axios.get(API_URLS.getCarsByCity, { params: { id } });
//     return response.data;
// });

// export const addCar = createAsyncThunk('cars/addCar', async (carForm) => {
//     const response = await axios.post(API_URLS.addCar, carForm);
//     return response.data;
// });

// export const deleteCarById = createAsyncThunk('cars/deleteCarById', async (id) => {
//     try {
//         await axios.delete(API_URLS.deleteCar(id)); // לא צריך להחזיר נתונים
//         return { id }; // מחזיר רק את ה-id של הרכב שנמחק
//     } catch (error) {
//         console.error('Error deleting car:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// });



// export const updateCar = createAsyncThunk('cars/updateCar', async ({ id, carForm }) => {
//     try {
//         const response = await axios.put(API_URLS.updateCar(id), carForm);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating car:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// });

// export const searchCars = createAsyncThunk('cars/searchCars', async (filters) => {
//     try {
//         const response = await axios.get(API_URLS.SearchCars, { params: filters });
//         return response.data;
//     } catch (error) {
//         console.error('Error searching cars:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// });

// const carsSlice = createSlice({
//     name: 'cars',
//     initialState: {
//         cars: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllCars.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getAllCars.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.cars = action.payload;
//             })
//             .addCase(getAllCars.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addCar.fulfilled, (state, action) => {
//                 state.cars.push(action.payload);
//             })
//             .addCase(searchCars.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.cars = action.payload; // Update cars with search results
//             })
//             .addCase(deleteCarById.fulfilled, (state, action) => {
//                 state.cars = state.cars.filter(car => car.id !== action.payload.id);
//             })
//             .addCase(updateCar.fulfilled, (state, action) => {
//                 const index = state.cars.findIndex(car => car.id === action.payload.id);
//                 if (index !== -1) {
//                     state.cars[index] = action.payload;
//                 }
//             });

//     },
// });

// export default carsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URLS from '../Api.js';

const getAuthHeaders = (getState) => {
    const state = getState();
    const token = state.user.token; 
    return { Authorization: `Bearer ${token}` }; 
};

export const getAllCars = createAsyncThunk('cars/fetchCars', async (filters, { getState }) => {
    try {
        const response = await axios.get(API_URLS.cars, {
            params: filters,
            headers: getAuthHeaders(getState) // הוספת הטוקן לכותרות
        });
        console.log('Response from API:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching cars:', error.response ? error.response.data : error.message);
        throw error;
    }
});

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (id, { getState }) => {
    const response = await axios.get(API_URLS.getCarsByCity, {
        params: { id },
        headers: getAuthHeaders(getState) // הוספת הטוקן לכותרות
    });
    return response.data;
});

export const addCar = createAsyncThunk('cars/addCar', async (carForm, { getState }) => {
    const response = await axios.post(API_URLS.addCar, carForm, {
        headers: getAuthHeaders(getState) 
    });
    return response.data;
});

export const deleteCarById = createAsyncThunk('cars/deleteCarById', async (id, { getState }) => {
    try {
        await axios.delete(API_URLS.deleteCar(id), {
            headers: getAuthHeaders(getState) 
        });
        return { id }; 
    } catch (error) {
        console.error('Error deleting car:', error.response ? error.response.data : error.message);
        throw error;
    }
});

export const updateCar = createAsyncThunk('cars/updateCar', async ({ id, carForm }, { getState }) => {
    try {
        const response = await axios.put(API_URLS.updateCar(id), carForm, {
            headers: getAuthHeaders(getState) 
        });
        return response.data;
    } catch (error) {
        console.error('Error updating car:', error.response ? error.response.data : error.message);
        throw error;
    }
});

export const searchCars = createAsyncThunk('cars/searchCars', async (filters, { getState }) => {
    try {
        const response = await axios.get(API_URLS.SearchCars, {
            params: filters,
            headers: getAuthHeaders(getState) 
        });
        return response.data;
    } catch (error) {
        console.error('Error searching cars:', error.response ? error.response.data : error.message);
        throw error;
    }
});

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        cars: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCars.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cars = action.payload;
            })
            .addCase(getAllCars.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
            })
            .addCase(searchCars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cars = action.payload; 
            })
            .addCase(deleteCarById.fulfilled, (state, action) => {
                state.cars = state.cars.filter(car => car.id !== action.payload.id);
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                const index = state.cars.findIndex(car => car.id === action.payload.id);
                if (index !== -1) {
                    state.cars[index] = action.payload;
                }
            });
    },
});

export default carsSlice.reducer;
