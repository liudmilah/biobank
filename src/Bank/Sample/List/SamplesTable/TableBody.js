import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableBody as TBody, TableRow, Checkbox, ButtonGroup, Tooltip, IconButton } from 'Common';

const cellStyle = {
    backgroundColor: '#fff',
};

function TableBody({
    rowStyle,
    columns,
    emptyRowsCount,
    canManageData,
    sortedData,
    selected,
    handleSelectOne,
    itemActions,
}) {
    return (
        <TBody>
            {sortedData.map((sample) => (
                <TableRow tabIndex={-1} key={sample.id} sx={rowStyle}>
                    {canManageData && (
                        <TableCell key="checkbox" sx={cellStyle}>
                            <Checkbox checked={!!selected[sample.id]} onChange={handleSelectOne(sample.id)} />
                        </TableCell>
                    )}

                    {columns.map((column) => (
                        <TableCell key={column} sx={cellStyle}>
                            {sample[column]}
                        </TableCell>
                    ))}

                    {canManageData && (
                        <TableCell key="actions" align="right" sx={cellStyle}>
                            <ButtonGroup variant="outlined" aria-label="text button group" size="small">
                                {itemActions.map((action) => (
                                    <Tooltip title={action.label} key={action.label}>
                                        <span>
                                            <IconButton
                                                aria-label={action.label}
                                                size="small"
                                                onClick={() => action.onClick(sample)}
                                                disabled={action.disabled && action.disabled(sample)}
                                            >
                                                {action.icon}
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                ))}
                            </ButtonGroup>
                        </TableCell>
                    )}
                </TableRow>
            ))}

            {emptyRowsCount > 0 && (
                <TableRow style={{ height: 53 * emptyRowsCount }} sx={rowStyle}>
                    <TableCell colSpan={6} sx={cellStyle} />
                </TableRow>
            )}
        </TBody>
    );
}

TableBody.propTypes = {
    rowStyle: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    sortedData: PropTypes.array.isRequired,
    emptyRowsCount: PropTypes.number.isRequired,
    canManageData: PropTypes.bool.isRequired,
    selected: PropTypes.object.isRequired,
    handleSelectOne: PropTypes.func.isRequired,
    itemActions: PropTypes.array.isRequired,
};

export default TableBody;
