// components/SearchBar.tsx
"use client";

import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-GrayCalido"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="block w-full p-3 pl-10 text-sm text-WhiteCalido bg-BlackCalido border border-BorderColor rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-GrayCalido"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
