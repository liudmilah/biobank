import React from 'react';
import PropTypes from 'prop-types';

const loadingStyle = {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(246, 246, 246, .9)',
};
const imgStyle = {
    display: 'block',
    width: 'auto',
    height: '30px',
};

function Loading({ visible = true }) {
    if (!visible) {
        return null;
    }

    return (
        <div style={loadingStyle}>
            <img style={imgStyle} alt="Loading" src="/images/loading.gif" />
        </div>
    );
}

Loading.propTypes = {
    visible: PropTypes.bool,
};

export default Loading;
