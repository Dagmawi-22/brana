import React from "react";

interface GenreTabProps {
  genres: string[];
  activeGenre: string;
  onSelect: (genre: string) => void;
}

const GenreTabs: React.FC<GenreTabProps> = ({
  genres,
  activeGenre,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className={`px-4 cursor-pointer py-2 text-sm sm:text-base rounded-full transition-all ${
            activeGenre === genre
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreTabs;
