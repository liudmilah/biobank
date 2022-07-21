import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TablePagination } from 'Common';

function Pagination({ rowsPerPageOptions, visible, paginationData }) {
    const { t } = useTranslation();

    return (
        visible && (
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                labelRowsPerPage={t('sampleRowsPerPage')}
                labelDisplayedRows={({ from, to, count }) => t('samplesRange', { from, to, num: count })}
                count={paginationData.allItemsAmount}
                rowsPerPage={paginationData.rowsPerPage}
                page={paginationData.currentPage}
                onPageChange={paginationData.setPage}
                onRowsPerPageChange={paginationData.updateRowsPerPage}
                backIconButtonProps={{ onClick: paginationData.prev, disabled: paginationData.currentPage === 0 }}
                nextIconButtonProps={{
                    onClick: paginationData.next,
                    disabled: paginationData.currentPage >= paginationData.maxPage,
                }}
            />
        )
    );
}

Pagination.propTypes = {
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
    visible: PropTypes.bool.isRequired,
    paginationData: PropTypes.shape({
        next: PropTypes.func.isRequired,
        prev: PropTypes.func.isRequired,
        setPage: PropTypes.func.isRequired,
        getCurrentData: PropTypes.func.isRequired,
        updateRowsPerPage: PropTypes.func.isRequired,
        getEmptyRowsCount: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        maxPage: PropTypes.number.isRequired,
        allItemsAmount: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    }).isRequired,
};

export default Pagination;
