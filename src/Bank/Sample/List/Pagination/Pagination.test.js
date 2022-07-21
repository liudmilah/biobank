import React from 'react';
import { render, screen } from 'test-utils';
import Pagination from './Pagination';

const paginationData = {
    next() {},
    prev() {},
    setPage() {},
    getCurrentData() {},
    updateRowsPerPage() {},
    getEmptyRowsCount() {},
    currentPage: 1,
    maxPage: 3,
    allItemsAmount: 25,
    rowsPerPage: 10,
};

test('render pagination', () => {
    render(<Pagination rowsPerPageOptions={[10, 10, 50]} visible={true} paginationData={paginationData} />);

    expect(screen.getByText('sampleRowsPerPage')).toBeInTheDocument();
});

test('hide pagination', () => {
    render(<Pagination rowsPerPageOptions={[10, 10, 50]} visible={false} paginationData={paginationData} />);

    expect(screen.queryByText('sampleRowsPerPage')).not.toBeInTheDocument();
});
