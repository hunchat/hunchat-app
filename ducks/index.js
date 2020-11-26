import { combineReducers } from 'redux';

import usersReducer from './usersSlice';
import videosReducer from './videosSlice';


const appReducer = combineReducers({
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
