import {combineReducers} from 'redux';

const songsReducer = () => {
  return [
    {title: 'Happy Hacking 1', artist: 'neo', duration: '9 to 6'},
    {title: 'Happy Hacking 2', artist: 'neo', duration: '9 to 6'},
    {title: 'Happy Hacking 3', artist: 'neo', duration: '9 to 6'},
    {title: 'Happy Hacking 4', artist: 'neo', duration: '9 to 6'},
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  } else {
    return selectedSong;
  }
};

const searchedKeywordReducer = (searchedKeyword = '', action) => {
  if (action.type === 'KEYWORD_SEARCHED') {
    return action.payload;
  } else {
    return searchedKeyword;
  }
};

const addedSongToPlaylistReducer = (addedSongToPlaylist = null, action) => {
  if(action.type === 'SONG_ADDED_TO_PLAYLIST'){
    return action.payload;
  } else {
    return addedSongToPlaylist;
  }
};

const downloadedSongReducer = (downloadedSong = null, action) => {
  if(action.type === 'SONG_DOWNLOADED'){
    return action.payload;
  } else {
    return downloadedSong;
  }
};

const playedSongReducer = (playedSong = null, action) => {
  if(action.type === 'SONG_PLAYED'){
    return action.payload;
  } else {
    return playedSong;
  }
};

const getPathReducer = (getPath = null, action) => {
  if(action.type === 'SET_PATH'){
    return action.payload;
  } else {
    return getPath;
  }
};

const checkedEmailReducer = (checkedEmail = '', action) => {
  if(action.type === 'CHECKED_EMAIL'){
    return action.payload;
  } else {
    return checkedEmail;
  }
};

const checkedPasswordReducer = (checkedPassword = '', action) => {
  if(action.type === 'CHECKED_PASSWORD'){
    return action.payload;
  } else {
    return checkedPassword;
  }
};

const confirmedPasswordReducer = (confirmedPassword = '', action) => {
  if(action.type === 'CONFIRMED_PASSWORD'){
    return action.payload;
  } else {
    return confirmedPassword;
  }
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  searchedKeyword: searchedKeywordReducer,
  addedSongToPlaylist: addedSongToPlaylistReducer,
  downloadedSong: downloadedSongReducer,
  playedSong: playedSongReducer,
  getPath: getPathReducer,
  checkedEmail: checkedEmailReducer,
  checkedPassword: checkedPasswordReducer,
  confirmedPassword: confirmedPasswordReducer,
});