import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead as THead, TableRow, TableSortLabel } from 'Common';

const cellStyle = {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    borderBottom: '3px solid rgba(224, 224, 224, 1)',
};

function TableHead({ rowStyle, columns, orderBy, order, handleSort }) {
    return (
        <THead>
            <TableRow sx={rowStyle}>
                {columns.map((column) => (
                    <TableCell key={column.label} sortDirection={orderBy === column.id ? order : false} sx={cellStyle}>
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={handleSort(column.id)}
                        >
                            {column.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </THead>
    );
}

TableHead.propTypes = {
    rowStyle: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    orderBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    handleSort: PropTypes.func.isRequired,
};

export default TableHead;
