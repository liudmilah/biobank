import React from 'react';
import PropTypes from 'prop-types';
import { AlertError, InfoModal, Loading } from 'Common';
import { SampleMap } from '../SampleMap';

function MapModal({ loading, open, data, onClose, serverGeneralError }) {
    return (
        <InfoModal
            open={open}
            loading={loading}
            onClose={onClose}
            title={data.sample ? data.sample.nameLat : ''}
            maxWidth={'lg'}
            bodyContent={
                <>
                    <Loading visible={loading} />

                    <AlertError
                        visible={!loading && !!serverGeneralError}
                        text={serverGeneralError}
                        sx={{ margin: '20px 0' }}
                    />

                    <SampleMap samples={data.samples || []} withClusters />
                </>
            }
        />
    );
}

MapModal.propTypes = {
    loading: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    serverGeneralError: PropTypes.string.isRequired,
};

export default MapModal;
