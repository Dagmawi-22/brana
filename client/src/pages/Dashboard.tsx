import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../utils/axiosInstance";
import BookCard from "../components/BookCard";
import { genres } from "../utils/constants";
import Header from "../components/Header";
import GenreTabs from "../components/GenreTabs";
import DeleteConfirmationModal from "../components/ConfirmModal";
import BookFormPopup from "../components/BookForm";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
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

      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8 relative">
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

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-70 bg-gray-100 z-50">
          <div className="animate-spin border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full"></div>
        </div>
      )}

      <div className="mt-6 sm:mt-8">
        {!loading && filteredBooks.length === 0 ? (
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

export default MyBooks;
