"use client";
import React, { createContext, useContext, useState } from "react";

// Define the shape of the context data
interface AppContextProps {
  searchTerm: string; // The current search term
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // Function to update the search term
  sortBy: string | null; // The current sorting option
  setSortBy: React.Dispatch<React.SetStateAction<string | null>>; // Function to update the sorting option
  perPage: number; // Number of items per page
  setPerPage: React.Dispatch<React.SetStateAction<number>>; // Function to update the number of items per page
}

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Custom hook to access the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Provider component to wrap the application
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // State variables for search term, sorting option, and items per page
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null); // You can set initial sorting options here
  const [perPage, setPerPage] = useState<number>(15);

  // Combine state variables into a single value object
  const value: AppContextProps = {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    perPage,
    setPerPage,
  };

  // Provide the context value to the entire application
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
