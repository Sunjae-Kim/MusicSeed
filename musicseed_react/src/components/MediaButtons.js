import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {addSongToPlaylist, downloadSong, playSong, deleteSongFromPlaylist} from "../actions";
import '../styles/MediaButtons.css';

class MediaButtons extends React.Component {

  onSearchPlayButtonClick(song){
    this.props.playSong(song);
    this.props.addSongToPlaylist(song);
  }

  renderSearchButtons(){
    return(
      <div className={'mediabuttons six wide column'}>
        <a
          href="#"
          onClick={() => this.onSearchPlayButtonClick(this.props.song)}>
          <img src="images/mediabuttons/play.png" alt="play button"/>
        </a>
        <a
          href="#"
          onClick={() => this.props.addSongToPlaylist(this.props.song)}
        >
          <img src="images/mediabuttons/addtoplaylist.png" alt="add to playlist button"/>
        </a>
        <a
          href="#"
          onClick={() => this.props.downloadSong(this.props.song)}
        >
          <img src="images/mediabuttons/download.png" alt="download button"/>
        </a>
      </div>
    );
  }

  renderPlaylistButtons(){
    return(
      <div className={'mediabuttons playlist six wide column'}>
        <a
          href="#"
          onClick={() => this.props.playSong(this.props.song)}>
          <img src="images/mediabuttons/play.png" alt="play button"/>
        </a>
        <a
          href="#"
          onClick={() => this.props.deleteSongFromPlaylist(this.props.song)}
        >
          <img src="images/mediabuttons/deletefromplaylist.png" alt="delete button"/>
        </a>
      </div>
    );
  }

  render() {
    switch (this.props.playerState) {
      case true:
        return (
          <Fragment>
            { this.renderSearchButtons() }
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            { this.renderPlaylistButtons() }
          </Fragment>
        );
      default:
        return;
    }
  }
}

const mapStateToProps = state => {
  return {
    playerState: state.playerState
  }
};

export default connect(
  mapStateToProps,
  {addSongToPlaylist, downloadSong, playSong, deleteSongFromPlaylist}
)(MediaButtons);