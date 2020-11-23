import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { rootReducer } from './ducks';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk), Reactotron.createEnhancer())
)

export let persistor = persistStore(store)
