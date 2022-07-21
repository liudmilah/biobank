import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWs } from 'Common';
import { createSample, deleteAllSamples, deleteSamples, updateSample, uploadSamples } from 'Bank/samplesSlice';

const withSamplesWs = (Component) => {
    const Wrapped = (props) => {
        const { subscribe } = useWs();
        const dispatch = useDispatch();

        useEffect(() => {
            const handlers = {
                SAMPLE_CREATED: handleSampleCreated,
                SAMPLE_DELETED: handleSampleDeleted,
                SAMPLE_UPLOADED: handleSamplesUploaded,
                SAMPLE_UPDATED: handleSampleUpdated,
                SAMPLE_DELETED_ALL: handleDeletedAllSamples,
            };

            subscribe('samples', handlers);
        }, []);

        function handleSampleCreated(data) {
            dispatch(createSample(data));
        }
        function handleSampleUpdated(data) {
            dispatch(updateSample(data));
        }
        function handleSampleDeleted(data) {
            dispatch(deleteSamples(data));
        }
        function handleDeletedAllSamples(data) {
            dispatch(deleteAllSamples(data));
        }
        function handleSamplesUploaded(data) {
            dispatch(uploadSamples(data));
        }

        return <Component {...props} />;
    };

    Wrapped.displayName = 'WithSamplesWs';

    return Wrapped;
};

export default withSamplesWs;
