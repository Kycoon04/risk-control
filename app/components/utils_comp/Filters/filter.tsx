import React, { useState } from "react";
import { ComponentProps } from '@/types';
import SearchButton from "./SearchButton";
import FilterInputs from "./FilterInputs";
import ClearFiltersButton from "./ClearFiltersButton";

function Component<T>(props: ComponentProps<T>) {
    const { filters, setFilters, clearFilters } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <>
            <SearchButton toggleDropdown={toggleDropdown} isOpen={isOpen} />
            <FilterInputs isOpen={isOpen} filters={filters} handleInputChange={handleInputChange} />
            <ClearFiltersButton isOpen={isOpen} clearFilters={clearFilters} />
        </>
    );
}

export default Component;
