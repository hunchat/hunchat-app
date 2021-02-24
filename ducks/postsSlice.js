import { batch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import _ from "lodash";
import { normalize, schema } from "normalizr";
import camelcaseKeys from "camelcase-keys";

import { userSchema, getUsers, addUser } from "./usersSlice";

export const postCommentTo = new schema.Entity("commentTo");

export const postCommentSchema = new schema.Entity("comments", {
  author: userSchema,
});

export const postSchema = new schema.Entity("posts", {
  author: userSchema,
  commentTo: postCommentTo,
  comments: [postCommentSchema],
});

export const getPosts = (state) => state.posts.byId;
export const getPostId = (state, props) => props.postId;

export const makeGetPostAuthorId = () => {
  return createSelector([getPosts, getPostId], (posts, id) => {
    if (posts[id]) {
      return posts[id].author;
    }
    return null;
  });
};

export const makeGetPostAuthor = () => {
  const getPostAuthorId = makeGetPostAuthorId();
  return createSelector([getUsers, getPostAuthorId], (users, id) => {
    if (users[id]) {
      return {
        id: id,
        username: users[id].username,
        name: users[id].name,
        image: users[id].image,
        imageUrl: users[id].imageUrl,
      };
    }
    return null;
  });
};

export const makeGetPostCommentToId = () => {
  return createSelector([getPosts, getPostId], (posts, id) => {
    if (posts[id]) {
      return posts[id].commentTo;
    }
    return null;
  });
};

export const makeGetPostCommentTo = () => {
  const getPostCommentToId = makeGetPostCommentToId();
  return createSelector(
    [getPosts, getPostId, getPostCommentToId],
    (posts, id, commentToId) => {
      if (posts[id] && commentToId && posts[commentToId]) {
        return {
          id: commentToId,
          video: posts[commentToId].video,
        };
      }
      return null;
    }
  );
};

export const makeGetPostThreadPostsIds = () => {
  return createSelector([getPosts, getPostId], (posts, id) => {
    if (posts[id]) {
      return posts[id].thread;
    }
    return null;
  });
};

export const makeGetPost = () => {
  const getPostAuthor = makeGetPostAuthor();
  const getPostCommentTo = makeGetPostCommentTo();
  return createSelector(
    [getPosts, getPostId, getPostAuthor, getPostCommentTo],
    (posts, id, author, commentTo) => {
      if (posts[id]) {
        return {
          id: id,
          video: posts[id].video,
          description: posts[id].description,
          author: author,
          link: posts[id].link,
          commentTo: commentTo,
          views: posts[id].views,
          likesCount: posts[id].likesCount,
          shares: posts[id].shares,
          commentsCount: posts[id].commentsCount,
        };
      }
      return null;
    }
  );
};

export function likePostThunk(postId) {
  return function (dispatch) {
    const PostsService = require("../services/api/posts/PostsService");
    const postsService = new PostsService();

    postsService
      .like(postId)
      .then((response) => {})
      .catch((error) => {});
  };
}

export function threadGetThunk(postId) {
  return function (dispatch) {
    const PostsService = require("../services/api/posts/PostsService");
    const postsService = new PostsService();

    postsService
      .getThread(postId)
      .then((response) => {
        batch(() => {
          let thread = [];
          response.data.map((post) => {
            const camelcasePost = camelcaseKeys(post, { deep: true });
            const normalizedPost = normalize(camelcasePost, postSchema);

            dispatch(addPost({ post: normalizedPost.entities.posts[post.id] }));
            dispatch(
              addUser({ user: normalizedPost.entities.users[post.author.id] })
            );

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

            thread.push(post.id);
          });

          dispatch(addPost({ post: { id: postId, thread: thread } }));
        });
      })
      .catch((error) => {});
  };
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    byId: {},
  },
  reducers: {
    addPost: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.post.id)) {
        // If post entry is non-existent, add entry
        state.byId[action.payload.post.id] = {};
      }
      // Populate/Update post entry
      state.byId[action.payload.post.id] = {
        ...state.byId[action.payload.post.id],
        ...action.payload.post,
      };
    },
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
