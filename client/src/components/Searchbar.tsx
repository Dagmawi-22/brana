import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-2xl px-4 py-2 shadow-sm max-w-lg mx-auto w-full transition-all duration-300 focus-within:max-w-xl focus-within:border-blue-500">
      <FaSearch className="text-gray-500 mr-2 transition-all duration-300 group-focus-within:text-blue-500" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search books..."
        className="w-full outline-none text-gray-700 placeholder-gray-400 transition-all duration-300 focus:placeholder-gray-600"
      />
    </div>
  );
};

export default SearchBar;
