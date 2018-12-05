export const getSelectedSong = (selectedSong = null, action) => {
  switch (action.type) {
    case "SONG_SELECTED":
      return action.payload;
    default:
      return selectedSong;
  }
};

export const getSearchedKeyword = (searchedKeyword = "", action) => {
  switch (action.type) {
    case "KEYWORD_SEARCHED":
      return action.payload;
    default:
      return searchedKeyword;
  }
};

export const getPlaylist = (playlist = [], action) => {
  switch (action.type) {
    case "ADD_TO_PLAYLIST":
      return playlist.concat([action.payload]);
    case "DELETE_FROM_PLAYLIST":
      return playlist.filter(song => song.id !== action.payload.id);
    default:
      return playlist;
  }
};

export const getDownloadedSong = (downloadedSong = null, action) => {
  switch (action.type) {
    case "SONG_DOWNLOADED":
      return action.payload;
    default:
      return downloadedSong;
  }
};

export const getOrderedSong = (order = null, action) => {
  switch (action.type) {
    case "SONG_ORDERED":
      return action.payload;
    default:
      return order;
  }
};

export const getPlayerState = (playerState = true, action) => {
  switch (action.type) {
    case "CHANGE_PLAYER_STATE":
      return action.payload;
    default:
      return playerState;
  }
};

export const getNumberOfTracks = (numberOfTracks = 1, action) => {
  switch (action.type) {
    case "ADD_TRACK":
      return action.payload;
    default:
      return numberOfTracks;
  }
};