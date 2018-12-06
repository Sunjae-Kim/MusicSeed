import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {addSongToPlaylist, downloadSong, songOrder, deleteSongFromPlaylist} from "../../actions/index";
import '../../styles/MediaButtons.css';

class MediaButtons extends React.Component {

  async onSearchPlayButtonClick(song){
    this.props.addSongToPlaylist(song);
    const order = {
      song,
      status : 'load',
      index : this.props.getPlaylist.length
    };
    const source = await document.querySelector('source');
    const src = order.song.file;
    if(!source.hasAttribute('src')){
      source.setAttribute('src', src );
    }
    this.props.songOrder(order);
    console.log(this.props.order);
  }

  async onPlaylistPlayButtonClick(song){
    const order = {
      song,
      status : 'load',
      index : this.props.index,
    };
    const source = await document.querySelector('source');
    const src = order.song.file;
    if(!source.hasAttribute('src')){
      source.setAttribute('src', src );
    }
    this.props.songOrder(order);
    console.log(this.props.order);
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
        {/*<a*/}
          {/*href="#"*/}
          {/*onClick={() => this.props.downloadSong(this.props.song)}*/}
        {/*>*/}
          {/*<img src="images/mediabuttons/download.png" alt="download button"/>*/}
        {/*</a>*/}
      </div>
    );
  }

  renderPlaylistButtons(){
    return(
      <div className={'mediabuttons playlist six wide column'}>
        <a
          href="#"
          onClick={() => this.onPlaylistPlayButtonClick(this.props.song)}>
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
    playerState: state.playerState,
    order: state.songOrdered,
    getPlaylist: state.getPlaylist,
  }
};

export default connect(
  mapStateToProps,
  {addSongToPlaylist, downloadSong, songOrder, deleteSongFromPlaylist}
)(MediaButtons);