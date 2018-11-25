import React, {Fragment} from "react";
import {connect} from 'react-redux';
import SearchInput from "../../components/SearchInput";
import TrackList from "../../components/TrackList";
import '../../styles/SidePlayer.css';

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
        <div>
          <SearchInput/>
          <div className={'sideplayer'}>
            <TrackList/>
          </div>
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