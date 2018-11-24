import React, {Fragment} from "react";
import {connect} from 'react-redux';
import SearchInput from "../../components/SearchInput";
import TrackList from "../../components/TrackList";

class SidePlayer extends React.Component {
  render() {
    return (
      <Fragment>
        { this.renderList() }
      </Fragment>
    )
  }

  renderList(){
    return(
      <div className={'player'}>
        <SearchInput/>
        <TrackList/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playerState: state.playerState,
  }
};

export default connect(
  mapStateToProps
)(SidePlayer);