import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {changePlayerState} from "../../actions/index";
import '../../styles/TrackList.css';
import MediaButtons from "./MediaButtons";
import {filterSonglist} from "../../utility";

class TrackList extends React.Component {

  songs;

  setSonglist(){
    switch (this.props.playerState) {
      case true:
        this.songs =
          this.props.searchedKeyword !== ''
          ? filterSonglist(this.props.searchedSongs, this.props.searchedKeyword)
          : this.props.searchedSongs;
        break;
      default:
        this.songs =
          this.props.searchedKeyword !== ''
            ? filterSonglist(this.props.getPlaylist, this.props.searchedKeyword)
            : this.props.getPlaylist;
    }
  }

  componentDidUpdate(){
    this.setSonglist();
  }

  renderList() {
    this.setSonglist();
    return this.songs.map((song, index) => {
      let isPlaying = '';
      if(this.props.order && !this.props.playerState){
        isPlaying = this.props.order.index === song.index ? 'playing' : '';
      }
      return (
        <div key={index} className={`tracklist ui grid ${isPlaying}`}>
          <div className="row">
            <div className="ten wide column">
              <div className="ui big divided list">
                <div className="item">
                  <img className="ui tiny image" src={song.artwork || 'images/LP.png'} alt="artwork"/>
                  <div className="content">
                    <div className="header">{song.title}</div>
                    {song.artist}
                    <span className="duration">{song.duration}</span>
                  </div>
                  <div className="right float content">
                  </div>
                </div>
              </div>
            </div>
            <MediaButtons song={song} index={index}/>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <Fragment>
        {this.renderList()}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchedSongs: state.searchedSongs,
    searchedKeyword: state.searchedKeyword,
    getPlaylist: state.getPlaylist,
    playerState: state.playerState,
    order: state.songOrdered,
  }
};

export default connect(
  mapStateToProps,
  {changePlayerState}
)(TrackList);