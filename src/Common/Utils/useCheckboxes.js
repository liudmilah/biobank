import { useState } from 'react';

const useCheckboxes = (ids = []) => {
    const [selected, setSelected] = useState({});

    const handleSelectAll = (event) => {
        const newSelected = event.target.checked ? Object.fromEntries(ids.map((id) => [id, true])) : {};

        setSelected(newSelected);
    };

    const handleSelectOne = (itemId) => (event) => {
        const newSelected = { ...selected };

        if (event.target.checked) {
            newSelected[itemId] = true;
        } else {
            delete newSelected[itemId];
        }

        setSelected(newSelected);
    };

    const areSelectedAll = () => {
        return ids.length > 0 && Object.keys(selected).length === ids.length;
    };

    const skipSelected = () => {
        setSelected({});
    };

    return {
        selected,
        handleSelectOne,
        handleSelectAll,
        areSelectedAll,
        skipSelected,
    };
};

export default useCheckboxes;
