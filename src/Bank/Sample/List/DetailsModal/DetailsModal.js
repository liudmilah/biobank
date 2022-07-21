import React from 'react';
import PropTypes from 'prop-types';
import { Grid, InfoModal, Typography } from 'Common';
import { sampleTypes } from 'Bank';
import useSamplesLabels from '../../useSamplesLabels';
import { SampleMap } from '../SampleMap';

function DetailsModal({ data, open, loading, onClose }) {
    const labels = useSamplesLabels();

    const columns = [
        {
            id: 'code',
        },
        {
            id: 'nameLat',
        },
        {
            id: 'interiorCode',
            visible: data.type === sampleTypes.BIRD,
        },
        {
            id: 'date',
        },
        {
            id: 'place',
        },
        {
            id: 'material',
        },
        {
            id: 'sex',
        },
        {
            id: 'age',
        },
        {
            id: 'responsible',
        },
        {
            id: 'description',
        },
        {
            id: 'ringNumber',
            visible: data.type === sampleTypes.BIRD,
        },
        {
            id: 'company',
            visible: data.type === sampleTypes.BIRD || data.type === sampleTypes.MAMMAL,
        },
        {
            id: 'cs',
            visible: data.type === sampleTypes.PSRER,
        },
        {
            id: 'sr',
            visible: data.type === sampleTypes.PSRER,
        },
        {
            id: 'waterbody',
            visible: data.type === sampleTypes.FISH || data.type === sampleTypes.AI,
        },
        {
            id: 'dna',
            visible: data.type === sampleTypes.FISH,
        },
    ].filter((column) => column.visible !== false);

    return (
        <InfoModal
            open={open}
            loading={loading}
            onClose={onClose}
            title={data.sample ? `${data.sample.nameLat}(${data.sample.code})` : ''}
            bodyContent={
                <>
                    {columns.map((column) =>
                        data.sample && data.sample[column.id] ? (
                            <Grid container spacing={1} key={column.id}>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {labels[column.id]}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2">{data.sample[column.id]}</Typography>
                                </Grid>
                            </Grid>
                        ) : null
                    )}

                    <SampleMap
                        samples={data.sample ? [data.sample] : []}
                        height="400px"
                        visible={!!(data.sample && data.sample.lat)}
                    />
                </>
            }
        />
    );
}

DetailsModal.propTypes = {
    loading: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default DetailsModal;
