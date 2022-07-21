import React from 'react';
import PropTypes from 'prop-types';
import { Placemark } from 'react-yandex-maps';
import useSamplesLabels from '../../useSamplesLabels';

const placemarkModules = ['geoObject.addon.balloon', 'geoObject.addon.hint'];
const emptyProps = {};

const PlacemarkList = ({ samples, withBalloon }) => {
    const labels = useSamplesLabels();

    const getBalloonProperties = (sample) => {
        return {
            balloonContentBody: Object.keys(labels)
                .map((field) => (sample[field] ? `<div><b>${labels[field]}:</b> ${sample[field]}</div>` : ''))
                .join(''),
        };
    };

    return (
        <>
            {samples.map((sample) => (
                <Placemark
                    key={sample.code}
                    geometry={[sample.lat, sample.lon]}
                    properties={withBalloon && sample ? getBalloonProperties(sample) : emptyProps}
                    modules={placemarkModules}
                />
            ))}
        </>
    );
};

PlacemarkList.propTypes = {
    samples: PropTypes.array.isRequired,
    withBalloon: PropTypes.bool,
};

export default PlacemarkList;
