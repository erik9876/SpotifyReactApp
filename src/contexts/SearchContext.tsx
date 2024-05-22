import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "../auth/AuthProvider";

export interface SearchResult {
  albums?: { items: any[] };
  artists?: { items: any[] };
  tracks?: { items: any[] };
  playlists?: { items: any[] };
  shows?: { items: any[] };
  episodes?: { items: any[] };
  audiobooks?: { items: any[] };
}

interface SearchContextType {
  results: SearchResult | null;
  search: (searchTerm: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [results, setResults] = useState<SearchResult | null>(null);
  const { clientToken, fetchClientToken } = useAuth();

  const search = async (searchTerm: string) => {
    if (!clientToken) {
      fetchClientToken();
    }
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchTerm
    )}&type=album,artist,playlist,track&limit=5`;
    try {
      const response = await fetch(searchEndpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${clientToken}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ results, search }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export default SearchContext;
