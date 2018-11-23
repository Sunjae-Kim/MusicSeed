import React from 'react';
import {connect} from 'react-redux';
import {addSongToPlaylist, downloadSong, playSong} from "../actions";
import '../styles/MediaButtons.css';

class MediaButtons extends React.Component {
  render() {
    return (
      <div className={'mediabuttons six wide column'}>
        <a
          onClick={() => this.props.playSong(this.props.song)}>
          <img src="images/mediabuttons/play.png" alt="play button"/>
        </a>
        <a
          onClick={() => this.props.addSongToPlaylist(this.props.song)}
        >
          <img src="images/mediabuttons/addtoplaylist.png" alt="add to playlist button"/>
        </a>
        <a
          onClick={() => this.props.downloadSong(this.props.song)}
        >
          <img src="images/mediabuttons/download.png" alt="download button"/>
        </a>
      </div>
    )
  }
}

const mapStateToProps = () => {return {}};

export default connect(
  mapStateToProps,
  {addSongToPlaylist, downloadSong, playSong}
)(MediaButtons);