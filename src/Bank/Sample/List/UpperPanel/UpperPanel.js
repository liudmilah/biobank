import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, DropdownMenu, SearchBar } from 'Common';

const wrapperStyle = { display: 'flex', justifyContent: 'space-between' };
const menuStyle = {
    color: '#000',
    width: '130px',
    marginRight: '15px',
    border: '1px solid #999',
    borderRadius: '5px',
    height: '37px',
};

function UpperPanel({ actions, handleSearchSamples, handleClearSearchInput }) {
    const { t } = useTranslation();

    return (
        <Box sx={wrapperStyle}>
            <DropdownMenu title={t('samplesActions')} menuItems={actions} btnStyle={menuStyle} />
            <SearchBar onSearch={handleSearchSamples} onClear={handleClearSearchInput} />
        </Box>
    );
}

UpperPanel.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ).isRequired,
    handleSearchSamples: PropTypes.func.isRequired,
    handleClearSearchInput: PropTypes.func.isRequired,
};

export default UpperPanel;
