import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from './BookSlice';
import { PencilAltIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (bookStatus === 'idle') {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  let content;

  if (bookStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (bookStatus === 'succeeded') {
    content = books.map((book) => (
      <div key={book.id} className="p-4 border rounded shadow-md">
        <img src={book.book_image} alt={book.title} className="w-32 h-32 object-cover mb-4" />
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-600">{book.isbn}</p>
        <div className="mt-4 flex space-x-2">
          <button className="text-blue-500">
            <PencilAltIcon className="h-5 w-5" />
          </button>
          <button className="text-red-500" onClick={() => handleDelete(book.id)}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    ));
  } else if (bookStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books</h1>
        <button className="bg-green-500 text-white p-2 rounded-full">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content}
      </div>
    </div>
  );
};

export default HomeScreen;
