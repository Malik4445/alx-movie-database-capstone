// src/components/SearchBar.jsx
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-12">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search movies or TV shows..."
        className="w-full h-16 px-6 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-[2rem] shadow-lg focus:ring-2 focus:ring-blue-500/50 italic text-gray-700"
      />
      <button
        onClick={onSearch}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-blue-100/10 rounded-full transition-colors"
      >
        <Search className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default SearchBar;