import React from "react";
import {connect} from 'react-redux';
import '../../styles/LPPlayer.css';
import {Link} from "react-router-dom";
import {setPath} from "../../actions";

class LPDiv extends React.Component {
  render() {
    if (!this.props.playedSong) {
      return (
        <div className={'lpplayer'}>
        </div>
      )
    } else {
      return (
        <div className={'lpplayer'}>
          <Link to={"/albumDetail"} className="item" onClick={() => this.props.setPath('albumDetail')}>
            <h1>{this.props.playedSong.title}</h1>
          </Link>
          <h2>{this.props.playedSong.artist}</h2>
          <img className="ui medium circular image" alt="artwork" src="images/album1.jpg"/>
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
  mapStateToProps,
  {setPath}
)(LPDiv);