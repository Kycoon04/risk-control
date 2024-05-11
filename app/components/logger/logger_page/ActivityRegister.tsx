// ActivityRegister.tsx

import React from "react";
import FilterSection from "./FilterSection";
import ContentSection from "./ContentSection";
import { Logger } from '@/types';

interface ActivityRegisterProps {
  isOpen: boolean;
  filters: Partial<Logger>;
  toggleDropdown: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  clearFilters: () => void;
  setFilters: React.Dispatch<React.SetStateAction<Partial<Logger>>>;
  isLoading: boolean;
  currentItems: Logger[];
  loggers: Logger[];
  itemsPerPage: number;
  currentPage: number;
  changePage: (pageNumber: number) => void;
}

const ActivityRegister: React.FC<ActivityRegisterProps> = ({
  isOpen,
  filters,
  toggleDropdown,
  handleInputChange,
  handleSelectChange,
  clearFilters,
  setFilters,
  isLoading,
  currentItems,
  loggers,
  itemsPerPage,
  currentPage,
  changePage,
}) => {
  return (
    <div className="bg-blue-1000 w-90vw md:w-90 sm:w-90 m-10 rounded-md justify-center sm:mx-20">
      <h1 className="text-center text-4xl font-extrabold text-white m-10 mb-5">
        Registro de actividades
      </h1>
      <FilterSection
        isOpen={isOpen} filters={filters} toggleDropdown={toggleDropdown}
        handleInputChange={handleInputChange} handleSelectChange={handleSelectChange}
        clearFilters={clearFilters} setFilters={setFilters}
      />
      <ContentSection
        isLoading={isLoading} currentItems={currentItems}
        loggers={loggers} itemsPerPage={itemsPerPage}
        currentPage={currentPage} changePage={changePage}
      />
    </div>
  );
};

export default ActivityRegister;
