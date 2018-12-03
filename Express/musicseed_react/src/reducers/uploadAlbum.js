export const setTitleSongReducer = (index=1, action) => {
  switch (action.type) {
    case 'SET_TITLE_SONG':
      return action.payload;
    default:
      return index;
  }
};

export const albumReducer = (album=null, action) => {
  switch(action.type){
    case 'SET_ALBUM':
      return action.payload;
    default:
      return album;
  }
};

export const albumDescriptionReducer = (description='', action) => {
  switch(action.type){
    case 'SET_ALBUM_DESCRIPTION':
      return action.payload;
    default:
      return description;
  }
};

export const albumDetailReducer = (albumDetail=null, action) => {
  switch(action.type){
    case 'SET_ALBUM_DETAIL':
      return action.payload;
    default:
      return albumDetail;
  }
};
