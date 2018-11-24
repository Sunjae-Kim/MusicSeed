import React, {Fragment} from "react";
import {connect} from 'react-redux';
import SearchInput from "../../components/SearchInput";
import SearchedTrackList from "../../components/SearchedTrackList";
import Playlist from "../../components/Playlist";
import '../../styles/Player.css';

class Player extends React.Component {
  render() {
    return (
      <Fragment>
        { this.renderList() }
      </Fragment>
    )
  }

  renderList(){
    if(this.props.playerState){
      return(
        <div className={'player'}>
          <SearchInput/>
          <SearchedTrackList/>
        </div>
      )
    } else {
      return(
        <div className={'player'}>
          <SearchInput/>
          <Playlist/>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    playerState: state.playerState,
  }
};

export default connect(
  mapStateToProps
)(Player);