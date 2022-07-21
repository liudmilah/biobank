import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField, SearchIcon, ClearIcon } from 'Common';

const inputStyle = {
    margin: '5px 0',
};

function SearchBar({ onSearch, onClear }) {
    const { t } = useTranslation();
    const [searchText, setSearchTextText] = useState('');

    const handleClear = () => {
        setSearchTextText('');
        onClear();
    };

    const handleChange = (e) => {
        const newSearchText = e.target.value;
        setSearchTextText(newSearchText);
    };

    const handleSubmit = () => {
        onSearch(searchText);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <TextField
            variant="standard"
            value={searchText}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={t('samplesSearchPlaceholder')}
            sx={inputStyle}
            InputProps={{
                startAdornment: (
                    <IconButton aria-label="Search" size="small" onClick={handleSubmit}>
                        <SearchIcon fontSize="small" />
                    </IconButton>
                ),
                endAdornment: (
                    <IconButton
                        aria-label="Clear"
                        size="small"
                        sx={{ visibility: searchText ? 'visible' : 'hidden' }}
                        onClick={handleClear}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                ),
            }}
        />
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
};

export default SearchBar;
