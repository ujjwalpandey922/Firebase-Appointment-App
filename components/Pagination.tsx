import React from "react";

interface PaginationProps {
  totalPosts: number; // Total number of posts
  postsPerPage: number; // Number of posts per page
  setCurrentPage: (page: number) => void; // Function to set the current page
  currentPage: number; // Current page number
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Generate an array of page numbers from 1 to totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center mt-4 w-full">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 shadow-md border border-white font-medium text-black text-lg mx-1 rounded-md focus:outline-none ${
            currentPage === page
              ? "bg-slate-400 shadow-md" // Active page style
              : "bg-transparent  hover:bg-slate-600 hover:text-white" // Inactive page style
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
