import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(`books/`);
  return response.data;
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await axios.post("/api/books/add/", book);
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, book }) => {
    const response = await axios.put(`/api/books/update/${id}/`, book);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`/api/books/delete/${id}/`);
  return id;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        state.books[index] = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
