import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook, clearMessages } from "./BookSlice";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditBookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const successMessage = useSelector((state) => state.books.successMessage);
  const book = useSelector((state) =>
    state.books.books.find((book) => book.id === parseInt(id))
  );

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);
  const [bookImage, setBookImage] = useState(book.book_image);

  useEffect(() => {
    if (successMessage) {
      dispatch(clearMessages());
      navigate("/");
    }
  }, [successMessage, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);
    if (bookImage) {
      formData.append("book_image", bookImage);
    } else alert("No image selected");
    dispatch(updateBook({ id: book.id, formData }));
  };

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 ml-5 mt-5 text-white rounded bg-blue-500 hover:bg-blue-700"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Go Back
      </Link>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="isbn"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="book_image"
          >
            Book Image
          </label>
          <input
            type="file"
            id="book_image"
            onChange={(e) => setBookImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
