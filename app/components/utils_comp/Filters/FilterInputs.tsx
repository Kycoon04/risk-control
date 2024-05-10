import React from "react";

type T = { [key: string]: any };

function FilterInputs({ isOpen, filters, handleInputChange }: { isOpen: boolean, filters: T, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="flex flex-col items-center justify-center">
                {isOpen && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {Object.keys(filters).map((key) => (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                value={filters[key as keyof T] as string}
                                onChange={handleInputChange}
                                placeholder={`Filtrar por ${key}`}
                                className="m-2 p-2 border border-gray-500 rounded-md text-black w-full"
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}

export default FilterInputs;
