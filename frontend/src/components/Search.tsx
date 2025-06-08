import { useEffect, useState } from "react";

interface SearchProps {
  onSearch: (category: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(category.trim());
    }, 300); 

    return () => {
      clearTimeout(handler); 
    };
  }, [category, onSearch]);

  return (
    <div className="flex justify-end items-center p-4 gap-2 w-full">
      <label className="text-lg font-semibold text-gray-700">Search:</label>
      <input
        type="text"
        placeholder="Enter Category..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200 w-64"
      />
      
    </div>
  );
};

export default Search;
