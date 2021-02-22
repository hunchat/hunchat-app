import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./authSlice";
import editProfileReducer from "./editProfileSlice";
import listsReducer from "./listsSlice";
import newPostReducer from "./newPostSlice";
import usersReducer from "./usersSlice";
import postsReducer from "./postsSlice";
import onboardingAddVideoBioReducer from "./onboardingAddVideoBioSlice";

const appReducer = combineReducers({
  auth: authReducer,
  editProfile: editProfileReducer,
  lists: listsReducer,
  newPost: newPostReducer,
  posts: postsReducer,
  users: usersReducer,
  onboardingAddVideoBio: onboardingAddVideoBioReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "auth/logOut") {
    // Delete redux persisted state from async storage
    AsyncStorage.removeItem("persist:root");

    state = undefined;
  }

  return appReducer(state, action);
};
