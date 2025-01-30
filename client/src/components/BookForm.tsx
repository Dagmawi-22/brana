import React, { useState } from "react";
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
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1940 + 1 },
    (_, index) => 1940 + index
  );

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = (e.target as any).title.value;
    const author = (e.target as any).author.value;
    const genre =
      (e.target as any).genre.value === "Custom"
        ? customGenre
        : (e.target as any).genre.value;
    const publishedYear = Number((e.target as any).publishedYear.value);

    // Form validation
    let formIsValid = true;
    let errors = { title: "", author: "", genre: "", publishedYear: "" };

    if (!title) {
      errors.title = "Title is required.";
      formIsValid = false;
    }
    if (!author) {
      errors.author = "Author is required.";
      formIsValid = false;
    }
    if (!genre) {
      errors.genre = "Genre is required.";
      formIsValid = false;
    }
    if (!publishedYear) {
      errors.publishedYear = "Published Year is required.";
      formIsValid = false;
    }

    setErrors(errors);

    if (formIsValid) {
      const bookData: Omit<Book, "_id"> = {
        title,
        author,
        genre,
        publishedYear,
      };
      onSubmit(bookData);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          {book ? "Edit Book" : "Add New Book"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {errors.title && (
              <small className="text-red-500 mt-1 block">{errors.title}</small>
            )}
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
            {errors.author && (
              <small className="text-red-500 mt-1 block">{errors.author}</small>
            )}
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
            {errors.genre && (
              <small className="text-red-500 mt-1 block">{errors.genre}</small>
            )}
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
            <select
              id="publishedYear"
              name="publishedYear"
              defaultValue={book?.publishedYear}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.publishedYear && (
              <small className="text-red-500 mt-1 block">
                {errors.publishedYear}
              </small>
            )}
          </div>

          {/* Buttons */}
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
