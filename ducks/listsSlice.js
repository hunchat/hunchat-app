import { createSlice } from "@reduxjs/toolkit";

import { createSelector } from "reselect";

export const getAllListsIds = (state) => Object.keys(state.lists.byId);

export const getLists = (state) => state.lists.byId;
export const getListId = (state, props) => props.listId;

export const makeGetListVideosIds = () => {
  return createSelector([getLists, getListId], (lists, id) => {
    return lists[id].videos;
  });
};

export const makeGetListName = () => {
  return createSelector([getLists, getListId], (lists, id) => {
    return lists[id].name;
  });
};

export const makeGetList = () => {
  return createSelector([getLists, getListId], (lists, id) => {
    return {
      name: lists[id].name,
      videos: lists[id].videos,
    };
  });
};

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    byId: {
      1: {
        id: "1",
        name: "Todas as Listas",
        videos: ["1", "2", "3"],
      },
      2: {
        id: "2",
        name: "Lista Design",
        videos: ["2", "3", "4"],
      },
      3: {
        id: "3",
        name: "Lista Amigos",
        videos: ["2", "3", "4", "5", "6"],
      },
      4: {
        id: "4",
        name: "Lista Culinária",
        videos: ["2", "3", "4", "6"],
      },
      5: {
        id: "5",
        name: "Lista Gaming",
        videos: ["2", "5", "7", "8"],
      },
      6: {
        id: "6",
        name: "Lista Desporto",
        videos: ["1", "3", "4", "7"],
      },
      7: {
        id: "7",
        name: "Lista Livros",
        videos: ["3", "4", "5", "8"],
      },
    },
  },
  reducers: {
    addList: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.list.id)) {
        // If list entry does not exist yet, initialize it
        state.byId[action.payload.list.id] = {};
      }
      // Populate/Update list entry
      state.byId[action.payload.list.id] = {
        ...state.byId[action.payload.list.id],
        ...action.payload.list,
      };
    },
  },
});

export const { addList } = listsSlice.actions;

export default listsSlice.reducer;
