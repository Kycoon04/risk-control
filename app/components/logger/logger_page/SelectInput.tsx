import React from "react";
import { Logger } from "@/types";

interface SelectInputProps {
    filters: Partial<Logger>;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ filters, handleSelectChange }) => {
    return (
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
    );
};

export default SelectInput;
