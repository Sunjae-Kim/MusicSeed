import React from 'react';
import {connect} from 'react-redux';
import '../styles/SearchedTrackList.css';
import MediaButtons from "./MediaButtons";

class SearchedTrackList extends React.Component {

  renderList(){
    return this.props.songs.map(song => {
      return(
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
              <MediaButtons song={ song }/>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="searchtracklist ui divided list">
        { this.renderList() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs,
  }
};

export default connect(
  mapStateToProps
)(SearchedTrackList);