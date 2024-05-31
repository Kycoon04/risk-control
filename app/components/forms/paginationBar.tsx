"use client";
import React from "react";
import Pagination from '@mui/material/Pagination';

interface PaginationBarProps {
    forms: any[];
    itemsPerPage: number;
    currentPage: number;
    changePage: (pageNumber: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ forms, itemsPerPage, currentPage, changePage }) => {
    return (
        <div className="flex justify-center">
            <Pagination
                className='mt-5 bg-white rounded-lg p-2'
                count={Math.ceil(forms.length / itemsPerPage)}
                page={currentPage}
                showFirstButton
                showLastButton
                onChange={(event, page) => changePage(page)}
            />
        </div>
    );
};

export default PaginationBar;