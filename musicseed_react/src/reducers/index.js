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

const selectedMenuReducer = (selectedMenu = 'player', action) => {
  if (action.type === 'MENU_SELECTED') {
    return action.payload;
  } else {
    return selectedMenu;
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

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  selectedMenu: selectedMenuReducer,
  searchedKeyword: searchedKeywordReducer,
  addedSongToPlaylist: addedSongToPlaylistReducer,
  downloadedSong: downloadedSongReducer,
  playedSong: playedSongReducer,
});