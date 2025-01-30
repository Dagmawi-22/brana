import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";
import api from "../utils/axiosInstance";
import BookCard from "../components/BookCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.username);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [customGenre, setCustomGenre] = useState("");

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

  const handleAddBook = async (bookData: any) => {
    try {
      await api.post("/books", bookData);
      fetchBooks();
      setShowAddBookPopup(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Welcome @{username}!
      </h2>
      <p className="mt-4 text-center text-gray-600">
        This is a protected page that only logged-in users can access.
      </p>

      <div className="text-center mt-8">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
          onClick={() => setShowAddBookPopup(true)}
        >
          Add New Book
        </button>
      </div>

      {loading ? (
        <p className="mt-4 text-center text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="mt-4 text-center text-gray-600">No books added</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {books.map((book: { _id: string; title: string; author: string }) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {showAddBookPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 transition-transform transform scale-95 hover:scale-100">
            <h3 className="text-2xl font-semibold mb-4">Add New Book</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const bookData = {
                  title: (e.target as any).title.value,
                  author: (e.target as any).author.value,
                  genre: (e.target as any).genre.value,
                  customGenre: customGenre,
                  publishedYear: Number((e.target as any).publishedYear.value),
                };
                handleAddBook(bookData);
              }}
              className="space-y-4"
            >
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
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Genre</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Biography">Biography</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="History">History</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror">Horror</option>
                </select>
                <p className="mt-2 text-sm text-gray-600">Or</p>
                <input
                  type="text"
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                  placeholder="Enter Custom Genre"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBookPopup(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
