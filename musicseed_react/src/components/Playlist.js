import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../styles/TrackList.css';
import {changePlayerState, deleteSongFromPlaylist} from "../actions";

class Playlist extends React.Component {

  renderList(){
    return this.props.playlist.map(song => {
      return(
        <div className="tracklist ui divided list" >
          <div key={ song.title } className="item">
            <div className={'ui grid'}>
              <div className="row">
                <div className="ten wide column">
                  <div className="content">
                    <h3>{ song.title }</h3>
                  </div>
                  <div className="right float content">
                    <h4>{ song.artist }</h4>
                  </div>
                </div>
                <a
                  onClick={() => this.props.deleteSongFromPlaylist(song)}
                >
                  <img src="images/mediabuttons/deletefromplaylist.png" alt="delete button"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <Fragment>
        { this.renderList() }
        <a
          onClick={() => this.props.changePlayerState(!this.props.playerState)}
        >
          <img src="images/mediabuttons/switch.png" alt="switch button"/>
        </a>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    playerState: state.playerState,
  }
};

export default connect(
  mapStateToProps,
  {changePlayerState, deleteSongFromPlaylist}
)(Playlist);