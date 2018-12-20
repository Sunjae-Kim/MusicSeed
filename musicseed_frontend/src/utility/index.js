export const commentsSort = comments => {
  const newComments = comments;
  newComments.sort((a, b) => {
    if (a.time > b.time) {
      return -1;
    }
    if (a.time < b.time) {
      return 1;
    }
    return 0;
  });
  return newComments;
};

export const buttonPaths = {
  prev: 'images/mediabuttons/prev.png',
  next: 'images/mediabuttons/next.png',
  play: 'images/mediabuttons/play.png',
  stop: 'images/mediabuttons/stop.png',
  pause: 'images/mediabuttons/pause.png',
  list: 'images/mediabuttons/list.png'
};

export const filterSonglist = (songlist, keyword) => {
  return songlist.filter(song => {
    const re = new RegExp(keyword.toUpperCase());
    const flag = re.test(song.title.toUpperCase());
    return flag;
  })
};