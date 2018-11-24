// Main
export const setPath = path => {
  return {
    type: 'SET_PATH',
    payload: path,
  }
};

// Controlled Element
export const searchKeyword = keyword => {
  return {
    type: 'KEYWORD_SEARCHED',
    payload: keyword,
  };
};

export const checkEmail = email => {
  return {
    type :'CHECKED_EMAIL',
    payload: email,
  };
};

export const checkPassword = password => {
  return {
    type : 'CHECKED_PASSWORD',
    payload: password,
  };
};

export const confirmPassword = password => {
  return {
    type : 'CONFIRMED_PASSWORD',
    payload: password,
  };
};

// Player
export const selectSong = song => {
  return {
    type: 'SONG_SELECTED',
    payload: song,
  };
};

export const changePlayerState = playerState => {
  return {
    type: 'CHANGE_PLAYER_STATE',
    payload: playerState,
  }
};

// Searched Media
export const addSongToPlaylist = song => {
  return {
    type: 'ADD_TO_PLAYLIST',
    payload: song,
  }
};

export const deleteSongFromPlaylist = song => {
  return {
    type: 'DELETE_FROM_PLAYLIST',
    payload: song,
  }
};

export const downloadSong = song => {
  return {
    type: 'SONG_DOWNLOADED',
    payload: song,
  }
};

export const playSong = song => {
  return {
    type: 'SONG_PLAYED',
    payload: song,
  }
};
