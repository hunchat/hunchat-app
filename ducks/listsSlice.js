import { batch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import _ from "lodash";
import { normalize } from "normalizr";
import camelcaseKeys from "camelcase-keys";

import { postSchema, addPost } from "./postsSlice";
import { addUser } from "./usersSlice";

export const getAllListsIds = (state) => Object.keys(state.lists.byId);

export const getLists = (state) => state.lists.byId;
export const getListId = (state, props) => props.listId;

export const makeGetListPostsIds = () => {
  return createSelector([getLists, getListId], (lists, id) => {
    if (lists[id]) {
      return lists[id].posts;
    }
    return null;
  });
};

export const makeGetListName = () => {
  return createSelector([getLists, getListId], (lists, id) => {
    if (lists[id]) {
      return lists[id].name;
    }
    return null;
  });
};

export const makeGetList = () => {
  return createSelector([getLists, getListId], (lists, id) => {
    if (lists[id]) {
      return {
        name: lists[id].name,
        posts: lists[id].posts,
      };
    }
    return null;
  });
};

export function getListPostsThunk() {
  return function (dispatch, getState) {
    const PostsService = require("../services/api/posts/PostsService");
    const postsService = new PostsService();

    postsService
      .list()
      .then((response) => {
        if (response.data.results.length !== 0) {
          batch(() => {
            response.data.results.map((post) => {
              const camelcasePost = camelcaseKeys(post, { deep: true});
              const normalizedPost = normalize(camelcasePost, postSchema);

              dispatch(addPost({ post: normalizedPost.entities.posts[post.id] }));
              dispatch(addPostToList({ listId: "1", postId: post.id }));
              dispatch(addUser({ user: normalizedPost.entities.users[post.author.id]}))

              if (normalizedPost.entities.commentTo) {
                dispatch(addPost({ post: normalizedPost.entities.commentTo }));
              }

              if (normalizedPost.entities.comments) {
                _.keys(normalizedPost.entities.comments).map((commentId) => {
                  dispatch(
                    addPost({
                      post: normalizedPost.entities.comments[commentId],
                    })
                  );
                });
              }

            });

          });
        }
      })
      .catch((error) => {

      });
  };
}

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    byId: {
      1: {
        id: "1",
        name: "All topics",
        posts: [],
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
    addPostToList: (state, action) => {
      // Populate/Update list posts
      if (!state.byId[action.payload.listId].posts.includes(action.payload.postId)) {
        state.byId[action.payload.listId].posts.push(action.payload.postId);
      }
    }
  },
});

export const { addList, addPostToList } = listsSlice.actions;

export default listsSlice.reducer;
