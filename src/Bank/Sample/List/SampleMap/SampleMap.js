import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Clusterer } from 'react-yandex-maps';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Switch } from 'Common';
import PlacemarkList from './PlacemarkList';

const minsk = [53.9006, 27.559];
const switchOptions = { 'aria-label': 'Switch clusters' };
const clusterOptions = { groupByCoordinates: false, hasBalloon: true };

function SampleMap({ visible = true, samples = [], withClusters = false, height = '700px', onClick = null }) {
    if (!visible) {
        return null;
    }

    const { t } = useTranslation();
    const [showClusters, setShowClusters] = useState(false);
    const samplesWithCoords = samples.filter((s) => !!s.lat);
    const defaultState = {
        center: samplesWithCoords.length > 0 ? [samplesWithCoords[0].lat, samplesWithCoords[0].lon] : minsk,
        zoom: 7,
    };

    const handleChangeSwitch = () => {
        setShowClusters((old) => !old);
    };

    return (
        <YMaps>
            {withClusters && (
                <FormControlLabel
                    control={<Switch checked={showClusters} onChange={handleChangeSwitch} inputProps={switchOptions} />}
                    label={t('mapClusterer')}
                />
            )}

            <Map defaultState={defaultState} width="100%" height={height} onClick={onClick}>
                {withClusters && showClusters ? (
                    <Clusterer options={clusterOptions}>
                        <PlacemarkList samples={samplesWithCoords} withBalloon={withClusters} />
                    </Clusterer>
                ) : (
                    <PlacemarkList samples={samplesWithCoords} withBalloon={withClusters} />
                )}
            </Map>
        </YMaps>
    );
}

SampleMap.propTypes = {
    samples: PropTypes.array,
    withClusters: PropTypes.bool,
    visible: PropTypes.bool,
    height: PropTypes.string,
    onClick: PropTypes.func,
};

export default SampleMap;
