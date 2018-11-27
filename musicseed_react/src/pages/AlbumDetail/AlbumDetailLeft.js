import React from "react";
import {connect} from 'react-redux';
import '../../styles/LPPlayer.css';

class AlbumDetailLeft extends React.Component {
  render() {
      return (
        <div className={'lpplayer'}>
          <h1>Album Title</h1>
          <h2>Artist Name</h2>
          <img className="ui medium circular image" alt="artwork" src="images/album1.jpg"/>
        </div>
      )
  }
}


const mapStateToProps = state => {
  return {
  }
};

export default connect(
  mapStateToProps
)(AlbumDetailLeft);