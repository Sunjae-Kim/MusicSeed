import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import '../../styles/TrackList.css';
import MediaButtons from "../../components/right/MediaButtons";

class TrackList extends React.Component {

  renderList() {
    return this.props.songs.map((song, index) => {
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
            <MediaButtons playerState={true} song={song}/>
          </div>
        </div>

      )
    })
  }

  render() {
    return (
      <Fragment>
        <div className={'sideplayer'}>
          {this.renderList()}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.searchedSongs,
  }
};

export default connect(
  mapStateToProps,
)(TrackList);