import { useState } from 'react';

function usePagination({ data, amount, defaultRowsPerPage, onPageChanged, onAmountPerPageChanged }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const allItemsAmount = amount || 0;
    const maxPage = allItemsAmount === 0 ? 0 : Math.ceil(allItemsAmount / rowsPerPage) - 1;

    const getCurrentData = () => {
        const begin = currentPage * rowsPerPage;
        const end = begin + rowsPerPage;
        return data.slice(begin, end);
    };

    const next = () => {
        const newPage = Math.min(currentPage + 1, maxPage);
        setCurrentPage(newPage);
        onPageChanged(newPage);
    };

    const prev = () => {
        const newPage = Math.max(currentPage - 1, 0);
        setCurrentPage(newPage);
        onPageChanged(newPage);
    };

    const setPage = (page) => {
        const pageNumber = Math.max(0, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    };

    const updateRowsPerPage = (event) => {
        const newAmount = parseInt(event.target.value, 10);
        setRowsPerPage(newAmount);
        setCurrentPage(0);
        onAmountPerPageChanged(newAmount);
    };

    const getEmptyRowsCount = () => {
        return currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - allItemsAmount) : 0;
    };

    return {
        next,
        prev,
        setPage,
        getCurrentData,
        updateRowsPerPage,
        getEmptyRowsCount,
        currentPage,
        maxPage,
        allItemsAmount,
        rowsPerPage,
    };
}

export default usePagination;
