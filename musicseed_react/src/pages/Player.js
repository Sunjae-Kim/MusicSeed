import React, { Fragment } from "react";
import SearchInput from "../components/SearchInput";
import SearchedTrackList from "../components/SearchedTrackList";
import '../styles/Player.css';

class Player extends React.Component {
  render() {
    return (
      <div className={'player'}>
        <SearchInput/>
        <SearchedTrackList/>
      </div>
    )
  }
}

export default Player;