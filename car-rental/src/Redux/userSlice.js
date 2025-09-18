// src/Redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post('https://localhost:7180/api/Auth/login', id, {
        headers: { 'Content-Type': 'application/json' }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue('מזהה שגוי');
    }
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                try {
                    // פענוח הטוקן (JWT) והוצאת נתוני המשתמש
                    const base64Url = action.payload.token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(
                        atob(base64)
                            .split('')
                            .map(function (c) {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            })
                            .join('')
                    );
                    const payload = JSON.parse(jsonPayload);
                    state.user = {
                        id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null,
                        name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null,
                        role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null,
                    };
                } catch {
                    state.user = { id: null, name: null, role: null };
                }
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'שגיאה בכניסה';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;