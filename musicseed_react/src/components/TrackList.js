import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {changePlayerState} from "../actions";
import '../styles/TrackList.css';
import MediaButtons from "./MediaButtons";

class TrackList extends React.Component {

  songs;

  setPlayer(){
    switch (this.props.playerState) {
      case true:
        this.songs = this.props.searchedSongs; break;
      default:
        this.songs = this.props.playlist; break;
    }
  }

  componentDidUpdate(){
    this.setPlayer();
  }

  renderList() {
    this.setPlayer();
    return this.songs.map((song, index) => {
      return (
        <div key={index} className={'tracklist ui grid'}>
          <div className="row">
            <div className="ten wide column">
              <div className="ui big divided list">
                <div className="item">
                  <img className="ui tiny image" src="images/album1.jpg" alt="artwork"/>
                  <div className="content">
                    <div className="header">{song.title}</div>
                    {song.artist}
                  </div>
                  <div className="right float content">
                  </div>
                </div>
              </div>
            </div>
            <MediaButtons song={song}/>
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
    playlist: state.playlist,
    playerState: state.playerState,
  }
};

export default connect(
  mapStateToProps,
  {changePlayerState}
)(TrackList);