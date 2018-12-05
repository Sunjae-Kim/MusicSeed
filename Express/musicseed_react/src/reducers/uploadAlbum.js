export const getTitleSong = (index=1, action) => {
  switch (action.type) {
    case 'SET_TITLE_SONG':
      return action.payload;
    default:
      return index;
  }
};

export const getAlbum = (album=null, action) => {
  switch(action.type){
    case 'SET_ALBUM':
      return action.payload;
    default:
      return album;
  }
};

export const getAlbumDescription = (description='', action) => {
  switch(action.type){
    case 'SET_ALBUM_DESCRIPTION':
      return action.payload;
    default:
      return description;
  }
};

export const getAlbumDetail = (albumDetail=null, action) => {
  switch(action.type){
    case 'SET_ALBUM_DETAIL':
      return action.payload;
    default:
      return albumDetail;
  }
};
