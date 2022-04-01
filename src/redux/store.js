import { createStore } from 'redux';

import { saveToLocalStorage, fetchFromLocalStorage } from '../../src/utils';

import rootReducers from './rootReducer';

const store = createStore(rootReducers, fetchFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
