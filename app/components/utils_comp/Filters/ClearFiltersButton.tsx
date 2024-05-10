import React from "react";

function ClearFiltersButton({ isOpen, clearFilters }: { isOpen: boolean, clearFilters: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center">
                {isOpen && (
                    <button
                        onClick={clearFilters}
                        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                    >
                        Limpiar Filtros
                    </button>
                )}
        </div>
    );
}

export default ClearFiltersButton;
