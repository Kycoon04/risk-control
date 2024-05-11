import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectInput from "./SelectInput";
import {Logger} from '@/types';
import DropdownToggle from "../../utils_comp/buttonToggle";

interface FilterSectionProps {
    isOpen: boolean;
    filters: Partial<Logger>;
    toggleDropdown: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    clearFilters: () => void;
    setFilters: React.Dispatch<React.SetStateAction<Partial<Logger>>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    isOpen,
    filters,
    toggleDropdown,
    handleInputChange,
    handleSelectChange,
    clearFilters,
    setFilters,
}) => {
    return (
        <div className="flex flex-wrap flex-col mb-16">
            <DropdownToggle isOpen={isOpen} toggleDropdown={toggleDropdown} />
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
                                className="m-2 p-2 border border-gray-500 rounded-md text-black w-[70%]"
                            />
                        );
                    })}
                {isOpen && filters.hasOwnProperty("transaction_type") && (
                    <SelectInput filters={filters} handleSelectChange={handleSelectChange} />
                )}
                {isOpen && filters.hasOwnProperty("date") && (
                    <DatePicker
                        selected={filters.date ? new Date(filters.date) : undefined}
                        onChange={(date: Date) => setFilters({ ...filters, date: date.toISOString() })}
                        placeholderText="Filtrar por fecha"
                        className="m-2 p-2 border border-gray-500 rounded-md text-black"
                    />
                )}
                {isOpen && (
                    <button
                        onClick={clearFilters}
                        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                    >
                        Limpiar Filtros
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterSection;
