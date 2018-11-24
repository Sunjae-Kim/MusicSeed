import React from "react";
import { connect } from 'react-redux';
import '../styles/LPPlayer.css';

class LPDiv extends React.Component {
  render() {
    if(!this.props.playedSong){
      return(
        <div className={'lpplayer'}>
          <h1></h1>
          <h2></h2>
        </div>
      )
    } else {
      return (
        <div className={'lpplayer'}>
          <h1>{ this.props.playedSong.title }</h1>
          <h2>{ this.props.playedSong.artist }</h2>
          <img className="ui medium circular image" src="images/album1.jpg" />
        </div>
      )
    }
  }
}


const mapStateToProps = state => {
  return {
    playedSong: state.playedSong
  }
};

export default connect(
  mapStateToProps
)(LPDiv);