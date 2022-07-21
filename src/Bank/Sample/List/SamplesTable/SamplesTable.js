import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableContainer, Loading } from 'Common';
import TableHead from './TableHead';
import TableBody from './TableBody';

const tableStyle = {
    minHeight: '500px',
    marginTop: '10px',
    position: 'relative',
};
const rowStyle = {
    verticalAlign: 'middle',
    outline: 0,
    borderCollapse: 'separate',
    borderSpacing: 0,
};

function SamplesTable({
    samples,
    emptyRowsCount,
    loading,
    visible,
    selected,
    handleSelectOne,
    itemActions,
    canManageData,
    areSelectedAll,
    handleSelectAll,
    columns,
    orderBy,
    order,
    handleSort,
}) {
    if (!visible) {
        return null;
    }

    return (
        <TableContainer style={tableStyle}>
            <Loading visible={loading} />

            <Table stickyHeader aria-label="table" size="small">
                <TableHead
                    rowStyle={rowStyle}
                    handleSort={handleSort}
                    order={order}
                    orderBy={orderBy}
                    columns={columns}
                    handleSelectAll={handleSelectAll}
                    areSelectedAll={areSelectedAll}
                    canManageData={canManageData}
                />
                <TableBody
                    rowStyle={rowStyle}
                    sortedData={samples}
                    emptyRowsCount={emptyRowsCount}
                    selected={selected}
                    columns={columns}
                    handleSelectOne={handleSelectOne}
                    itemActions={itemActions}
                    canManageData={canManageData}
                />
            </Table>
        </TableContainer>
    );
}

SamplesTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    canManageData: PropTypes.bool.isRequired,
    areSelectedAll: PropTypes.bool.isRequired,
    selected: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    itemActions: PropTypes.array.isRequired,
    samples: PropTypes.array.isRequired,
    handleSelectOne: PropTypes.func.isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
    emptyRowsCount: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
};

export default SamplesTable;
