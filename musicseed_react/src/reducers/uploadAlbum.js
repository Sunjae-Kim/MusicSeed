export const setTitleSongReducer = (index=1, action) => {
  switch (action.type) {
    case 'SET_TITLE_SONG':
      return action.payload;
    default:
      return index;
  }
};
