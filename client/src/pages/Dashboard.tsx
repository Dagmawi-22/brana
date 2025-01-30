import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../utils/axiosInstance";
import BookCard from "../components/BookCard";
import { genres } from "../utils/constants";
import Header from "../components/Header";
import GenreTabs from "../components/GenreTabs";

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

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const MyBooks = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddBookPopup, setShowAddBookPopup] = useState<boolean>(false);
  const [showEditBookPopup, setShowEditBookPopup] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [customGenre, setCustomGenre] = useState<string>("");
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: Omit<Book, "_id">) => {
    try {
      await api.post("/books", bookData);
      fetchBooks();
      setShowAddBookPopup(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleEditBook = async (bookData: Omit<Book, "_id">) => {
    if (!selectedBook) return;
    try {
      await api.put(`/books/${selectedBook._id}`, bookData);
      fetchBooks();
      setShowEditBookPopup(false);
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;
    try {
      await api.delete(`/books/${bookToDelete._id}`);
      fetchBooks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks =
    activeGenre === "All"
      ? books
      : books.filter((book) => book.genre === activeGenre);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
      <Header
        username={username as string}
        setShowAddBookPopup={setShowAddBookPopup}
        handleLogout={handleLogout}
      />
      <GenreTabs
        genres={genres}
        activeGenre={activeGenre}
        onSelect={setActiveGenre}
      />

      <div className="mt-6 sm:mt-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading books...</p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-gray-600">
            No books found in this genre.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={() => {
                  setSelectedBook(book);
                  setShowEditBookPopup(true);
                }}
                onDelete={() => {
                  setBookToDelete(book);
                  setShowDeleteModal(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {showAddBookPopup && (
        <BookFormPopup
          onClose={() => setShowAddBookPopup(false)}
          onSubmit={handleAddBook}
          customGenre={customGenre}
          setCustomGenre={setCustomGenre}
        />
      )}

      {showEditBookPopup && (
        <BookFormPopup
          onClose={() => setShowEditBookPopup(false)}
          onSubmit={handleEditBook}
          customGenre={customGenre}
          setCustomGenre={setCustomGenre}
          book={selectedBook as Book}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteBook}
        />
      )}
    </div>
  );
};

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

const DeleteConfirmationModal = ({
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Confirm Delete
        </h3>
        <p className="text-gray-700">
          Are you sure you want to delete this book?
        </p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
