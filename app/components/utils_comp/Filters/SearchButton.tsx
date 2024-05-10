import React from "react";
import { IoSearch } from "react-icons/io5";

function SearchButton({ toggleDropdown, isOpen }: { toggleDropdown: () => void, isOpen: boolean }) {
    return (
        <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
    >
        <IoSearch className="text-white text-xl" />
        <svg
            className={`w-3 h-2.5 ms-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
            />
        </svg>
    </button>
    );
}

export default SearchButton;