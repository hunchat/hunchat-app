import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';


export const getLists = state => state.lists.byId;
export const getListId = (state, props) => props.listId;


const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    byId: {},
  },
  reducers: {
    addList: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.list.id)) {
        // If list entry does not exist yet, initialize it
        state.byId[action.payload.list.id] = {};
      }
      // Populate/Update list entry
      state.byId[action.payload.list.id] = {...state.byId[action.payload.list.id], ...action.payload.list};
    }
  },
});


export const { addList } = listsSlice.actions;

export default listsSlice.reducer;
