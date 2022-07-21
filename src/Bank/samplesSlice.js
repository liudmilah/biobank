import { createSlice } from '@reduxjs/toolkit';
import sampleTypes from './sampleTypes';

const initialState = {};
Object.values(sampleTypes).forEach((name) => {
    initialState[name] = {
        list: undefined,
        statistics: undefined,
        map: [],
        amount: 0,
    };
});

const samplesSlice = createSlice({
    name: 'samples',
    initialState,
    reducers: {
        updateSamples: (state, action) => {
            state[action.payload.type].list = action.payload.list;
            state[action.payload.type].amount = action.payload.amount;
            state[action.payload.type].statistics = undefined;
        },
        updateMap: (state, action) => {
            state[action.payload.type].map = action.payload.list;
        },
        updateSample: (state, action) => {
            const list = JSON.parse(JSON.stringify(state[action.payload.type].list));
            const index = list.findIndex((s) => s.id === action.payload.id);
            if (index > -1) {
                state[action.payload.type].list[index] = action.payload;
            }
        },
        createSample: (state, action) => {
            const list = JSON.parse(JSON.stringify(state[action.payload.type].list));
            const index = list.findIndex((s) => s.id === action.payload.id);
            if (index === -1) {
                state[action.payload.type].list = list.concat(action.payload);
                state[action.payload.type].amount = list.length + 1;
                state[action.payload.type].statistics = undefined;
            }
        },
        deleteSamples: (state, action) => {
            const list = JSON.parse(JSON.stringify(state[action.payload.type].list)).filter(
                (sample) => !action.payload.ids.includes(sample.id)
            );
            state[action.payload.type].list = list;
            state[action.payload.type].amount = list.length;
            state[action.payload.type].statistics = undefined;
        },
        deleteAllSamples: (state, action) => {
            state[action.payload.type].list = [];
            state[action.payload.type].amount = 0;
            state[action.payload.type].statistics = [];
        },
        updateStatistics: (state, action) => {
            state[action.payload.type].statistics = action.payload.statistics;
        },
        uploadSamples: (state, action) => {
            state[action.payload.type].list = undefined;
            state[action.payload.type].amount = 0;
            state[action.payload.type].statistics = undefined;
        },
    },
});

// selectors
export const selectSamplesList = (type) => (state) => state.samples[type].list;
export const selectSamplesAmount = (type) => (state) => state.samples[type].amount;
export const selectSamplesStatistics = (type) => (state) => state.samples[type].statistics;

// actions
export const updateSamples = samplesSlice.actions.updateSamples;
export const updateSample = samplesSlice.actions.updateSample;
export const createSample = samplesSlice.actions.createSample;
export const deleteAllSamples = samplesSlice.actions.deleteAllSamples;
export const deleteSamples = samplesSlice.actions.deleteSamples;
export const updateStatistics = samplesSlice.actions.updateStatistics;
export const uploadSamples = samplesSlice.actions.uploadSamples;

// reducer
export const samplesSliceReducer = samplesSlice.reducer;
