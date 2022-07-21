import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    id: '',
    role: '',
    clientId: Math.random().toString().substring(2), // it is used to differentiate browser tabs
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.role = action.payload.role;
        },
        changeName: (state, action) => {
            state.name = action.payload.name;
        },
        changePassword: (state) => {},
    },
});

// selectors
export const selectUser = (state) => state.user;
export const selectUserName = (state) => state.user.name;
export const selectUserId = (state) => state.user.id;

// actions
export const updateUser = userSlice.actions.updateUser;
export const changeName = userSlice.actions.changeName;
export const changePassword = userSlice.actions.changePassword;

// reducer
export const userSliceReducer = userSlice.reducer;
