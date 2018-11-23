import React from "react";
import SearchInput from "../components/SearchInput";
import "../styles/PlayerRightSideDiv.css";
import SearchedTrackList from "./SearchedTrackList";

class PlayerRightSideDiv extends React.Component {
  render() {
    return (
      <div className={'playerrightsidediv'}>
        <SearchInput/>
        <SearchedTrackList/>
      </div>
    )
  }
}

export default PlayerRightSideDiv;