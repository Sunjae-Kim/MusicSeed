import { combineReducers } from "redux";
import { auth } from "./auth";

import {
  getTitleSong,
  getAlbum,
  getAlbumDescription,
  getAlbumDetail
} from "./uploadAlbum";

import {
  getEmail,
  getPassword,
  getConfirmedPassword,
  getUserName,
  getUserNickname
} from "./user";

import {
  getSelectedSong,
  getSearchedKeyword,
  getPlaylist,
  getDownloadedSong,
  getOrderedSong,
  getPlayerState,
  getNumberOfTracks,
  getShuffledList
} from "./player";

import { getComments, getCommentBody } from "./comment";

const songsReducer = () => {
  return [
    {
      id: 1,
      title: "축배를 들어라",
      artist: "달빛요정",
      duration: "3:15",
      file: "songs/song-1.mp3",
      artwork: ""
    },
    {
      id: 2,
      title: "New Thang",
      artist: "Redfoo",
      duration: "4:02",
      file: "http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3",
      artwork:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Redfoo_-_New_Thang_%28cover%29.jpg/220px-Redfoo_-_New_Thang_%28cover%29.jpg"
    },
    {
      id: 3,
      title: "Summer Love",
      artist: "Justin Timberlake",
      duration: "4:12",
      file: "http://claymore.france.free.fr/momo/summer%20love.mp3",
      artwork:
        "http://myuvn.com/wp-content/uploads/2015/07/justin-timberlake-pusher-love-girl.jpg"
    },
    {
      id: 4,
      title: "Thunder",
      artist: "Imagine Dragons",
      duration: "3:09",
      file: "http://audeliver.com/mp3cloud/ohR2qXGxgdDFl3.mp3",
      artwork:
        "https://3.bp.blogspot.com/-n7i80k5OmP0/WnXhKe4Wr2I/AAAAAAAAFHc/o1r2iQs2qEgFZOX26SZpDoI5rdmPsybXgCLcBGAs/s1600/imagine_dragons_-_thunder_remix_1.jpg"
    },
    {
      id: 5,
      title: "PPAP",
      artist: "PIKOTARO",
      duration: "2:39",
      file: "songs/PPAP.mp3",
      artwork:
        "https://images-na.ssl-images-amazon.com/images/I/61A6Df8Fu5L._SS500.jpg"
    }
  ];
};

const getPath = (getPath = null, action) => {
  switch (action.type) {
    case "SET_PATH":
      return action.payload;
    default:
      return getPath;
  }
};

export default combineReducers({
  searchedSongs: songsReducer,
  selectedSong: getSelectedSong,
  searchedKeyword: getSearchedKeyword,
  getPlaylist: getPlaylist,
  downloadedSong: getDownloadedSong,
  songOrdered: getOrderedSong,
  getPath: getPath,
  checkedEmail: getEmail,
  checkedPassword: getPassword,
  confirmedPassword: getConfirmedPassword,
  checkedName: getUserName,
  checkedNickname: getUserNickname,
  playerState: getPlayerState,
  numberOfTracks: getNumberOfTracks,
  comments: getComments,
  commentTyped: getCommentBody,
  auth: auth,
  titleSong: getTitleSong,
  getAlbum: getAlbum,
  getAlbumDescription: getAlbumDescription,
  getAlbumDetail: getAlbumDetail,
  getShuffledList: getShuffledList,
});
