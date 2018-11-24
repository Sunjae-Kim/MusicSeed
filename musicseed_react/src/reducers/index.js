import {combineReducers} from 'redux';

const songsReducer = () => {
  return [
    {id: 1, title: 'Happy Hacking 1', artist: 'neo', duration: '9 to 6'},
    {id: 2, title: 'Happy Hacking 2', artist: 'neo', duration: '9 to 6'},
    {id: 3, title: 'Happy Hacking 3', artist: 'neo', duration: '9 to 6'},
    {id: 4, title: 'Happy Hacking 4', artist: 'neo', duration: '9 to 6'},
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

const playedSongReducer = (playedSong = null, action) => {
  switch (action.type) {
    case 'SONG_PLAYED':
      return action.payload;
    default:
      return playedSong;
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

const playerStateReducer = (playerState = true, action) => {
  switch (action.type) {
    case 'CHANGE_PLAYER_STATE':
      return action.payload;
    default:
      return playerState;
  }
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  searchedKeyword: searchedKeywordReducer,
  playlist: playlistReducer,
  downloadedSong: downloadedSongReducer,
  playedSong: playedSongReducer,
  getPath: getPathReducer,
  checkedEmail: checkedEmailReducer,
  checkedPassword: checkedPasswordReducer,
  confirmedPassword: confirmedPasswordReducer,
  playerState: playerStateReducer,
});