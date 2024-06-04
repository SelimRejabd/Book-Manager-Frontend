import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  books: [],
  status: 'idle',
  error: null,
  successMessage: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(`books/`);
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (formData) => {
  const response = await axios.post('/books/add/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async ({ id, formData }) => {
  const response = await axios.put(`books/update/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await axios.delete(`books/delete/${id}/`);
  return id;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearMessages(state) {
      state.successMessage = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.successMessage = 'Book added successfully!';
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        state.books[index] = action.payload;
        state.successMessage = 'Book updated successfully!';
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.successMessage = 'Book deleted successfully!';
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearMessages } = booksSlice.actions;

export default booksSlice.reducer;
