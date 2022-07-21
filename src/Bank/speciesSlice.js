import { createSlice } from '@reduxjs/toolkit';

const speciesSlice = createSlice({
    name: 'species',
    initialState: {
        list: [],
    },
    reducers: {
        updateSpecies: (state, action) => {
            state.list = action.payload;
        },
    },
});

// selectors
export const selectSpecies = (state) => state.species.list;

// actions
export const updateSpecies = speciesSlice.actions.updateSpecies;

// reducer
export const speciesSliceReducer = speciesSlice.reducer;
