"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Something went wrong!
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        We encountered an unexpected error while trying to load this content. Please try again.
      </p>

      <Button
        onPress={() => reset()}
        className="px-6 bg-[#FACC15] text-black font-medium rounded-full shadow-md hover:opacity-90"
      >
        Try Again
      </Button>
    </div>
  );
};

export default Error;