import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    byId: {},
  },
  reducers: {
    addUser: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.user.id)) {
        // If user entry does not exist yet, initialize it
        state.byId[action.payload.user.id] = {};
      }
      // Populate/Update user entry
      state.byId[action.payload.user.id] = {...state.byId[action.payload.user.id], ...action.payload.user};
    }
  },
});


export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
