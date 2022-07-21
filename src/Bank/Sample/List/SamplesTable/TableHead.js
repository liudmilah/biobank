import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableHead as THead, TableRow, TableSortLabel } from 'Common';
import useSamplesLabels from '../../useSamplesLabels';

const cellStyle = {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    borderBottom: '3px solid rgba(224, 224, 224, 1)',
};

function TableHead({ rowStyle, columns, orderBy, order, handleSort, canManageData, areSelectedAll, handleSelectAll }) {
    const { t } = useTranslation();
    const labels = useSamplesLabels();

    return (
        <THead>
            <TableRow sx={rowStyle}>
                {canManageData && (
                    <TableCell key="table-checkbox" sx={cellStyle}>
                        <Checkbox checked={areSelectedAll} onChange={handleSelectAll} />
                    </TableCell>
                )}

                {columns.map((column) => (
                    <TableCell key={column} sortDirection={orderBy === column ? order : false} sx={cellStyle}>
                        <TableSortLabel
                            active={canManageData && orderBy === column}
                            direction={orderBy === column ? order : 'asc'}
                            onClick={canManageData ? handleSort(column) : null}
                        >
                            {labels[column]}
                        </TableSortLabel>
                    </TableCell>
                ))}

                {canManageData && (
                    <TableCell key="table-actions" align="center" sx={cellStyle}>
                        {t('samplesActions')}
                    </TableCell>
                )}
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
    canManageData: PropTypes.bool.isRequired,
    areSelectedAll: PropTypes.bool.isRequired,
    handleSelectAll: PropTypes.func.isRequired,
};

export default TableHead;
