import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducer } from 'User';
import { samplesSliceReducer, speciesSliceReducer } from 'Bank';
import { authSliceReducer } from 'Auth';

export default configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        samples: samplesSliceReducer,
        species: speciesSliceReducer,
    },
});
