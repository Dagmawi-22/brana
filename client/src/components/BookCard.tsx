import React from "react";

// Define the type for the book object
interface Book {
  _id: string;
  title: string;
  author: string;
}

interface BookCardProps {
  book: Book; // The book prop will adhere to the Book type
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="mt-2 text-gray-600">{book.author}</p>
      <div className="mt-4 flex justify-between items-center">
        <button className="text-blue-500 hover:underline">Edit</button>
        <button className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default BookCard;
