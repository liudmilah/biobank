import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableBody as TBody, TableRow } from 'Common';

const cellStyle = {
    backgroundColor: '#fff',
};

function TableBody({ rowStyle, columns, sortedData }) {
    return (
        <TBody>
            {sortedData.map((s) => (
                <TableRow tabIndex={-1} key={s.name} sx={rowStyle}>
                    {columns.map((column) => (
                        <TableCell key={column.id} sx={cellStyle}>
                            {s[column.id]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TBody>
    );
}

TableBody.propTypes = {
    rowStyle: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    sortedData: PropTypes.array.isRequired,
};

export default TableBody;
