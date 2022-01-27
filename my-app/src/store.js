import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import sliceReducer from './slice';

const store = configureStore({
    reducer: {
        files: sliceReducer,   
    },
    middleware: [thunk, logger]
})

export default store;