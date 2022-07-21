import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userSliceReducer } from 'User';
import { samplesSliceReducer, speciesSliceReducer } from 'Bank';
import { authSliceReducer } from 'Auth';

const reducer = {
    auth: authSliceReducer,
    user: userSliceReducer,
    samples: samplesSliceReducer,
    species: speciesSliceReducer,
};

function render(ui, { preloadedState, store = configureStore({ reducer, preloadedState }), ...renderOptions } = {}) {
    // eslint-disable-next-line
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export { screen, fireEvent, waitFor } from '@testing-library/react';
export { render };
