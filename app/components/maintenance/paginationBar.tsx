"use client";
import React from "react";
import Pagination from '@mui/material/Pagination';

interface PaginationBarProps {
    maintenance: any[];
    itemsPerPage: number;
    currentPage: number;
    changePage: (pageNumber: number) => void;
    count: number;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ maintenance, itemsPerPage, currentPage, changePage,count }) => {
    return (
        <div className="flex justify-center">
            <Pagination
                className='mt-5 bg-white rounded-lg p-2'
                count={Math.ceil(count / itemsPerPage)}
                page={currentPage}
                showFirstButton
                showLastButton
                onChange={(event, page) => changePage(page)}
            />
        </div>
    );
};

export default PaginationBar;