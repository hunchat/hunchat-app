import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';

import { getUsers } from './usersSlice';


export const getVideos = state => state.videos.byId;
export const getVideoId = (state, props) => props.videoId;

export const makeGetVideoAuthorId = () => {
  return createSelector(
    [getVideos, getVideoId],
    (videos, id) => {
      return videos[id].author;
    }
  )
};

export const makeGetVideoAuthor = () => {
  const getVideoAuthorId = makeGetVideoAuthorId();
  return createSelector(
    [getUsers, getVideoAuthorId],
    (users, id) => {
      return {
        id: id,
        username: users[id].username,
        imageUrl: users[id].imageUrl,
      }
    }
  )
};

export const makeGetVideo = () => {
  const getVideoAuthor = makeGetVideoAuthor();
  return createSelector(
    [getVideos, getVideoId, getVideoAuthor],
    (videos, id, author) => {
      return {
        id: id,
        url: videos[id].url,
        description: videos[id].description,
        author: author,
        externalLink: videos[id].externalLink,
        views: videos[id].views,
        likes: videos[id].likes,
        shares: videos[id].shares,
        answer: videos[id].answer,
      }
    }
  )
};


const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    byId: {
      '1': {
        id: '1',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-15/e35/128944305_425513315493717_210962657978162941_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=BeN2sbW5O90AX-WQ5s8&tp=1&oh=d784e2752ce7886189bca5c2a0ca09f8&oe=5FCB2B63',
        description: 'This is a very short description of this video I just posted',
        author: 'aa',
        externalLink: 'example.com',
        views: '306',
        likes: '189',
        shares: '22',
        answer: '1',
      },
      '2': {
        id: '2',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-15/e35/128944305_425513315493717_210962657978162941_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=BeN2sbW5O90AX-WQ5s8&tp=1&oh=d784e2752ce7886189bca5c2a0ca09f8&oe=5FCB2B63',
        description: 'Secret beach “La Playa del Amor” in Islas Marietas, Mexico',
        author: 'bb',
        externalLink: 'example.com',
        views: '200',
        likes: '81',
        shares: '12',
        answer: '5',
      },
      '3': {
        id: '3',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/127939334_198393301814256_8921741831673252662_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=LLbJ2DE5IRMAX8HAX9g&oe=5FC8F656&oh=d429e7aa3827e84459ac4f6a78f9a5a3',
        description: 'This was CLEAN',
        author: 'cc',
        externalLink: 'example.com',
        views: '404',
        likes: '121',
        shares: '21',
        answer: '26',
      },
      '4': {
        id: '4',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/127199917_913327152530243_4641490979170110651_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=KVNILaZP4YgAX8v_36O&oe=5FC86BE2&oh=ae4c6440cbcedcad60c3f145adc86239',
        description: 'Persistance is key',
        author: 'dd',
        externalLink: 'example.com',
        views: '404',
        likes: '121',
        shares: '21',
        answer: '26',
      },
      '5': {
        id: '5',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/125505221_195609342034245_3388236763194820638_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=LaDTAsF_DIEAX91n5ft&oe=5FC8949C&oh=8433aae9890375a055a430a011cc1957',
        description: 'I can be a ball boy too',
        author: 'ee',
        externalLink: 'example.com',
        views: '404',
        likes: '121',
        shares: '21',
        answer: '26',
      },
      '6': {
        id: '6',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/127939334_198393301814256_8921741831673252662_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=LLbJ2DE5IRMAX8HAX9g&oe=5FC8F656&oh=d429e7aa3827e84459ac4f6a78f9a5a3',
        description: 'Free diving in crystal clear water at the only place on Earth where you can touch both the North American and the Eurasian Continental Plate at the same time! Location: Silfra, Iceland',
        author: 'ff',
        externalLink: 'example.com',
        views: '404',
        likes: '121',
        shares: '21',
        answer: '26',
      },
      '7': {
        id: '7',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/125549710_713340066274556_5872930227307495258_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=5eC5hEO_LZYAX8ik57V&oe=5FC8AC55&oh=311b4a96543ed3c28d37498826b40be5',
        description: 'Me at the Olympics',
        author: 'gg',
        externalLink: 'example.com',
        views: '404',
        likes: '121',
        shares: '21',
        answer: '26',
      },
      '8': {
        id: '8',
        url: 'https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/126435293_306716230400845_5494035644464095985_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Bti1NjEUTZwAX_z-kqi&oe=5FC88A1F&oh=1575d32435cde6b7c5e551df62858df6',
        description: 'Who’d love to meet this beautiful waving bear? 😍🐻',
        author: 'hh',
        externalLink: 'example.com',
        views: '404',
        likes: '121',
        shares: '21',
        answer: '26',
      },
    }
  },
  reducers: {
    addVideo: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.video.id)) {
        // If video entry is non-existent, add entry
        state.byId[action.payload.video.id] = {}
      }
      // Populate/Update video entry
      state.byId[action.payload.video.id] = {...state.byId[action.payload.video.id], ...action.payload.video}
    },
  },
})

export const { addVideo } = videosSlice.actions;

export default videosSlice.reducer;
