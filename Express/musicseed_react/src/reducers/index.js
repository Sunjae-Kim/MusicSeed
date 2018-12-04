import {combineReducers} from 'redux';
import authReducer from './authReducer';

import {
  setTitleSongReducer, albumReducer, albumDescriptionReducer, albumDetailReducer
} from "./uploadAlbum";

const songsReducer = () => {
  return [
    {id: 1, title: '축배를 들어라', artist: '달빛요정', duration: '3:15', file: 'songs/song-1.mp3', 
    artwork: ''},
    {id: 2, title: 'New Thang', artist: 'Redfoo', duration: '4:02', file: 'http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3', 
    artwork: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Redfoo_-_New_Thang_%28cover%29.jpg/220px-Redfoo_-_New_Thang_%28cover%29.jpg' },
    {id: 3, title: 'Happy Hacking 3', artist: 'neo', duration: '3:56', file: 'songs/song-1.mp3' , artwork: ''},
    {id: 4, title: 'Happy Hacking 4', artist: 'neo', duration: '3:56', file: 'songs/song-1.mp3' , artwork: ''},
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  switch (action.type) {
    case 'SONG_SELECTED':
      return action.payload;
    default:
      return selectedSong;
  }
};

const searchedKeywordReducer = (searchedKeyword = '', action) => {
  switch (action.type) {
    case 'KEYWORD_SEARCHED':
      return action.payload;
    default:
      return searchedKeyword;
  }
};

const playlistReducer = (playlist = [], action) => {
  switch (action.type) {
    case 'ADD_TO_PLAYLIST':
      return playlist.concat([action.payload]);
    case 'DELETE_FROM_PLAYLIST':
      return playlist.filter((song) => song.id !== action.payload.id);
    default:
      return playlist;
  }
};

const downloadedSongReducer = (downloadedSong = null, action) => {
  switch (action.type) {
    case 'SONG_DOWNLOADED':
      return action.payload;
    default:
      return downloadedSong;
  }
};

const orderSongReducer = (order = null, action) => {
  switch (action.type) {
    case 'SONG_ORDERED':
      return action.payload;
    default:
      return order;
  }
};

const getPathReducer = (getPath = null, action) => {
  switch (action.type) {
    case 'SET_PATH':
      return action.payload;
    default:
      return getPath;
  }
};

// ********************* USER
const checkedEmailReducer = (checkedEmail = '', action) => {
  switch (action.type) {
    case 'CHECKED_EMAIL':
      return action.payload;
    default:
      return checkedEmail;
  }
};

const checkedPasswordReducer = (checkedPassword = '', action) => {
  switch (action.type) {
    case 'CHECKED_PASSWORD':
      return action.payload;
    default:
      return checkedPassword;
  }
};

const confirmedPasswordReducer = (confirmedPassword = '', action) => {
  switch (action.type) {
    case 'CONFIRMED_PASSWORD':
      return action.payload;
    default:
      return confirmedPassword;
  }
};

const checkNameReducer = (checkedName = '', action) => {
  switch (action.type) {
    case 'CHECKED_NAME':
      return action.payload;
    default:
      return checkedName;
  }
};

const checkNicknameReducer = (checkedNickname = '', action) => {
  switch (action.type) {
    case 'CHECKED_NICKNAME':
      return action.payload;
    default:
      return checkedNickname;
  }
};


// ********************* PLAYER
const playerStateReducer = (playerState = true, action) => {
  switch (action.type) {
    case 'CHANGE_PLAYER_STATE':
      return action.payload;
    default:
      return playerState;
  }
};

const addTrackInAlbumReducer = (numberOfTracks=1, action) => {
  switch (action.type) {
    case 'ADD_TRACK':
      return action.payload;
    default:
      return numberOfTracks;
  }
};

const commentsReducer = (comment = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return comment.concat([action.payload]);
    case 'DELETE_COMMENT':
      return comment;
    default:
      return comment;
  }
};

const typeCommentReducer = (text = '', action) =>  {
  switch (action.type) {
    case 'TYPE_COMMENT':
      return action.payload;
    default:
      return text;
  }
};

// ********************* UPLOAD SONG
export default combineReducers({
  searchedSongs: songsReducer,
  selectedSong: selectedSongReducer,
  searchedKeyword: searchedKeywordReducer,
  playlist: playlistReducer,
  downloadedSong: downloadedSongReducer,
  songOrdered: orderSongReducer,
  getPath: getPathReducer,
  checkedEmail: checkedEmailReducer,
  checkedPassword: checkedPasswordReducer,
  confirmedPassword: confirmedPasswordReducer,
  checkedName: checkNameReducer,
  checkedNickname: checkNicknameReducer,
  playerState: playerStateReducer,
  numberOfTracks: addTrackInAlbumReducer,
  comments: commentsReducer,
  commentTyped: typeCommentReducer,
  auth: authReducer,
  titleSong: setTitleSongReducer,
  getAlbum: albumReducer,
  getAlbumDescription: albumDescriptionReducer,
  getAlbumDetail: albumDetailReducer,
});