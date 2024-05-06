import React from "react";
import DatePicker from "react-datepicker";
import { IoSearch } from "react-icons/io5";
import { Logger } from "@/types";
interface FilterDropdownProps {
    filters: Partial<Logger>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    clearFilters: () => void;
}
const FilterDropdown: React.FC<FilterDropdownProps> = ({ filters, handleInputChange, handleSelectChange, clearFilters }) => {
    const isOpen = Object.keys(filters).length > 0;
    return (
        <div className="flex flex-wrap flex-col mb-16">
            <button
                onClick={clearFilters}
                className={`flex items-center justify-center w-full py-2 px-3 text-white rounded hover:text-purple-300 md:hover:bg-transparent md:border-0 md:hover:text-purple-300 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${isOpen ? 'bg-red-600' : ''}`}>
                <IoSearch className="text-white text-xl" />
                <svg
                    className={`w-3 h-2.5 ms-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <div className="flex flex-col items-center justify-center">
                {isOpen &&
                    Object.keys(filters).map((key) => {
                        if (key === "date" || key === "transaction_type") {
                            return null;
                        }
                        return (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                value={filters[key as keyof Logger]}
                                onChange={handleInputChange}
                                placeholder={`Filtrar por ${key}`}
                                className="m-2 p-2 border border-gray-500 rounded-md text-black w-[70%]" />
                        );
                    })}
                {isOpen && filters.hasOwnProperty("transaction_type") && (
                    <select
                        name="transaction_type"
                        value={filters.transaction_type}
                        onChange={handleSelectChange}
                        className="m-2 p-2 border border-gray-500 rounded-md text-black">
                        <option value="" disabled hidden>
                            Filtrar por tipo de transacción
                        </option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                )}
                {isOpen && filters.hasOwnProperty("date") && (
                    <DatePicker
                        selected={
                            filters.date ? new Date(filters.date) : undefined
                        }
                        onChange={(date: Date) =>
                            handleInputChange({
                                target: { name: "date", value: date.toISOString() }
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        placeholderText="Filtrar por fecha"
                        className="m-2 p-2 border border-gray-500 rounded-md text-black" />
                )}
                {isOpen && (
                    <button
                        onClick={clearFilters}
                        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700">
                        Limpiar Filtros
                    </button>
                )}
            </div>
        </div>
    );
};
export default FilterDropdown;