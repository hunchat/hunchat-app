import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { schema } from "normalizr";
import camelcaseKeys from "camelcase-keys";

export const userSchema = new schema.Entity("users");

export const getUsers = (state) => state.users.byId;
export const getUserId = (state, props) => props.userId;

export const makeGetUser = () => {
  return createSelector([getUsers, getUserId], (users, id) => {
    if (users[id]) {
      return {
        id: id,
        username: users[id].username,
        name: users[id].name,
        email: users[id].email,
        image: users[id].image,
        imageUrl: users[id].imageUrl,
        bio: users[id].bio,
        bioVideo: users[id].bioVideo,
        location: users[id].location,
        dateJoined: users[id].dateJoined,
        link: users[id].link,
      };
    }
    return null;
  });
};

export function retrieveUserThunk(userId) {
  return function (dispatch, getState) {
    const UsersService = require("../services/api/authentication/UsersService");
    const usersService = new UsersService();

    usersService
      .get(userId)
      .then((response) => {
        const camelcaseUser = camelcaseKeys(response.data, { deep: true });
        dispatch(addUser({ user: camelcaseUser }));
      })
      .catch((error) => {
        // Handle error
        // - No user with that id
      });
  };
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    byId: {},
    currentUserId: null,
  },
  reducers: {
    addUser: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.user.id)) {
        // If user entry does not exist yet, initialize it
        state.byId[action.payload.user.id] = {};
      }
      // Populate/Update user entry
      state.byId[action.payload.user.id] = {
        ...state.byId[action.payload.user.id],
        ...action.payload.user,
      };
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});

export const {
  addUser,
  setCurrentUserId,
} = usersSlice.actions;

export default usersSlice.reducer;
