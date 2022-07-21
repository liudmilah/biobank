import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: window.localStorage.getItem('loggedIn') === 'true',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateLoggedIn: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
        },
    },
});

// selectors
export const selectLoggedIn = (state) => state.auth.loggedIn;

// actions
export const updateLoggedIn = authSlice.actions.updateLoggedIn;

// reducer
export const authSliceReducer = authSlice.reducer;
