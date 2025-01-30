import React from "react";
import { genres } from "../utils/constants";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
}

interface BookFormPopupProps {
  onClose: () => void;
  onSubmit: (bookData: Omit<Book, "_id">) => void;
  customGenre: string;
  setCustomGenre: React.Dispatch<React.SetStateAction<string>>;
  book?: Book;
}

const BookFormPopup = ({
  onClose,
  onSubmit,
  customGenre,
  setCustomGenre,
  book,
}: BookFormPopupProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookData: Omit<Book, "_id"> = {
      title: (e.target as any).title.value,
      author: (e.target as any).author.value,
      genre:
        (e.target as any).genre.value === "Custom"
          ? customGenre
          : (e.target as any).genre.value,
      publishedYear: Number((e.target as any).publishedYear.value),
    };
    onSubmit(bookData);
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          {book ? "Edit Book" : "Add New Book"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={book?.title}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              defaultValue={book?.author}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              defaultValue={book?.genre}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              ))}
              <option value="Custom">Custom</option>
            </select>
            {customGenre && (
              <input
                type="text"
                value={customGenre}
                onChange={(e) => setCustomGenre(e.target.value)}
                placeholder="Enter Custom Genre"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          <div>
            <label
              htmlFor="publishedYear"
              className="block text-sm font-medium text-gray-700"
            >
              Published Year
            </label>
            <input
              id="publishedYear"
              name="publishedYear"
              type="number"
              defaultValue={book?.publishedYear}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            >
              {book ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormPopup;
