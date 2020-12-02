import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';


export const getUsers = (state) => state.users.byId;
export const getUserId = (state, props) => props.userId;

export const makeGetUser = () => {
  return createSelector(
    [getUsers, getUserId],
    (users, id) => {
      return {
        id: id,
        username: users[id].username,
        imageUrl: users[id].imageUrl,
      }
    }
  )
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    byId: {
      'aa': {
        id: 'aa',
        username: 'JaneFisher',
        imageUrl: '',
      },
      'bb': {
        id: 'bb',
        username: 'PadiTV',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/42173854_2004594479830850_5521340897511342080_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=e-uZ4TTGChAAX-16veF&oh=21d36be74996a9a030b1b9270c433d83&oe=5FEF2C62',
      },
      'cc': {
        id: 'cc',
        username: 'SportsCenter',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/44681398_2171288513142976_2550353929711910912_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=bIoyLntCkxAAX-He8sz&tp=1&oh=efb2a011c3f0b028366c633609f4d148&oe=5FEF76C8',
      },
      'dd': {
        id: 'dd',
        username: 'XGames',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/108730147_953590338443287_8324159938009935733_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=0UuH3g6TdKgAX8VQMT2&tp=1&oh=715ccfc719d706b9e5a1321aad3b1a5d&oe=5FEFEEC8',
      },
      'ee': {
        id: 'ee',
        username: 'MaxDog',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/106187871_210011660187820_6326930798585199888_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=7Vo5DFFnoBQAX9njlGm&tp=1&oh=93b7c026123efb35636da920bb52dd02&oe=5FEE54E6',
      },
      'ff': {
        id: 'ff',
        username: 'OceanExplorer',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82568108_604265420371942_5650349822318739456_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=5SorX8iHJlAAX9m5N1e&tp=1&oh=bde8bd3321f370fb036c8372faab32e8&oe=5FF06B92',
      },
      'gg': {
        id: 'gg',
        username: 'JumpingJack',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/122403260_816318832475631_6920856436795025895_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=AplnQEL0dhwAX-7QEOD&tp=1&oh=87c877541b3a744077191322aa4c8b41&oe=5FF0F413',
      },
      'hh': {
        id: 'hh',
        username: 'TheExplorer',
        imageUrl: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/96750331_627666348094013_8303191644627271680_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=hwIbmUcqxpEAX_ehAnZ&tp=1&oh=caf13be29f8b0f3a4f5c7f4b9eb53f60&oe=5FEE5A9F',
      },
    },
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
