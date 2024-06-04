import React from 'react';
import HomeScreen from './features/books/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookForm from './features/books/AddBookForm';
import EditBookForm from './features/books/EditBookForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="edit/:id" element={<EditBookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
