import React from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
}

interface BookCardProps {
  book: Book;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-101">
      <h3 className="text-2xl font-semibold text-gray-800">{book.title}</h3>
      <p className="mt-2 text-gray-600 italic">{book.author}</p>
      <div className="mt-4 flex flex-wrap space-x-6 text-gray-600">
        <div className="flex items-center space-x-2">
          <FaTag className="text-lg text-blue-500" />
          <span className="text-sm">{book.genre}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-lg text-green-500" />
          <span className="text-sm">{book.publishedYear}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center space-x-4">
        <button
          onClick={() => onEdit(book._id)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors duration-200 cursor-pointer"
        >
          <span className="inline-block mr-2">✏️</span> Edit
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200 cursor-pointer"
        >
          <span className="inline-block mr-2">🗑️</span> Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
