import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Loading, Table, TableContainer, Box, AlertError, useSorting, req, urls } from 'Common';
import { sampleTypes, updateStatistics, selectSamplesStatistics } from 'Bank';
import TableHead from './TableHead';
import TableBody from './TableBody';

const containerStyle = { width: '100%' };
const tableContainerStyle = { height: '550px', marginTop: '10px', position: 'relative' };
const rowStyle = {
    verticalAlign: 'middle',
    outline: 0,
    borderCollapse: 'separate',
    borderSpacing: 0,
};
const alertStyle = {
    margin: '10px 0',
};

const notFoundStyle = { width: '100%', textAlign: 'center' };

function Statistics({ type, visible }) {
    const statistics = useSelector(selectSamplesStatistics(type));
    const { sortedData, order, orderBy, handleSort } = useSorting(statistics || [], 'name', 'asc');
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const columns = [
        {
            label: t('samplesStatisticsNameLat'),
            id: 'name',
        },
        {
            label: t('samplesStatisticsAmount'),
            id: 'amount',
        },
    ];

    const fetchStatistics = () => {
        setLoading(true);

        req(`${urls.SAMPLES_STATISTICS.path}?type=${type}`, urls.SAMPLES_STATISTICS.method)
            .then((data) => {
                dispatch(updateStatistics({ type, statistics: data.statistics }));
            })
            .catch(() => {
                setErrorMessage(t('errorServerError'));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (visible && statistics === undefined) {
            fetchStatistics();
        }
    }, [visible]);

    if (statistics && statistics.length === 0) {
        return (
            <Box sx={notFoundStyle}>
                <p>{t('samplesNotFound')}</p>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <AlertError visible={!!errorMessage} text={errorMessage} sx={alertStyle} />

            <TableContainer style={tableContainerStyle}>
                <Loading visible={loading} />

                <Table stickyHeader aria-label="table" size="small">
                    <TableHead
                        columns={columns}
                        order={order}
                        orderBy={orderBy}
                        handleSort={handleSort}
                        rowStyle={rowStyle}
                    />
                    <TableBody columns={columns} sortedData={sortedData} rowStyle={rowStyle} />
                </Table>
            </TableContainer>
        </Box>
    );
}

Statistics.whyDidYouRender = true;

Statistics.propTypes = {
    type: PropTypes.oneOf(Object.values(sampleTypes)).isRequired,
    visible: PropTypes.bool.isRequired,
};

export default Statistics;
