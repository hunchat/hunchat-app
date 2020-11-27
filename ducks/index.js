import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import newPostReducer from './newPostSlice';
import usersReducer from './usersSlice';
import videosReducer from './videosSlice';


const appReducer = combineReducers({
  newPost: newPostReducer,
  users: usersReducer,
  videos: videosReducer,
})

export const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    // Delete redux persisted state from async storage
    AsyncStorage.removeItem('persist:root')

    state = undefined
  }

  return appReducer(state, action)
}
