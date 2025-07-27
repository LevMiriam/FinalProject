import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// קריאה לשרת – משנה לכתובת שלך!
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    const response = await fetch('https://localhost:7180/api/Customers', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const text = await response.text();
    if (!text) return rejectWithValue('אירעה שגיאה בטעינת הלקוחות. נסה שוב מאוחר יותר.');
    try {
      return JSON.parse(text);
    } catch {
      return rejectWithValue('שגיאה בנתוני השרת');
    }
  }
);

export const addClient = createAsyncThunk('clients/addClient', async (client) => {
  const res = await axios.post('https://localhost:7180/api/Auth/signup', client);
  return res.data;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'אירעה שגיאה בטעינת הלקוחות. נסה שוב מאוחר יותר.';
      })
      // הוספת לקוח חדש לסטייט כאשר הבקשה הצליחה
      .addCase(addClient.fulfilled, (state, action) => {
        // אם חזר אובייקט ריק, לא להוסיף לסטייט
        if (!action.payload || Object.keys(action.payload).length === 0) return;
        state.items.push(action.payload);
      })
      // טיפול במקרה של כישלון בהוספת לקוח
      .addCase(addClient.rejected, (state, action) => {
        state.error = action.error.message || 'הוספת הלקוח נכשלה';
      });
  },
});

export default clientsSlice.reducer;
