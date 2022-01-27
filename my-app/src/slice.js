import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'files',
    initialState: {
        getFiles: [],
        showFiles: [],
        addFiles: []
    },
    reducers: {
        getFiles: (state, action) => {
            state.getFiles.push(action.payload)
            state.showFiles.push(action.payload)
        },
        showFiles: (state, action) => {
            state.showFiles.push(action.payload)
        },
        addFiles: (state, action) => {
            state.addFiles.push(action.payload)
        }
    }
})

export default slice.reducer;
const getFiles = slice.actions.getFiles;
const showFiles = slice.actions.showFiles;
const addFiles = slice.actions.addFiles;

export { getFiles, showFiles, addFiles }