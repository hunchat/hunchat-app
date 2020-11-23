import { combineReducers } from 'redux';


const appReducer = combineReducers({
  // Include reducers here
})

export const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    // Delete redux persisted state from async storage
    AsyncStorage.removeItem('persist:root')

    state = undefined
  }

  return appReducer(state, action)
}
