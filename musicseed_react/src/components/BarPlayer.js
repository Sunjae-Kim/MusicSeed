import React from 'react';
import { connect } from 'react-redux';
import "../styles/BarPlayer.css";
import MediaButtons from "./MediaButtons";

const BarPlayer = ({song}) => {
  return(
    <div>
      { renderSong(song) }
    </div>
  )
};

const renderSong = song => {
  if(!song){
    return(
      <div className={'barplayer container'}>
      </div>
    )
  } else{
    return(
      <div className={'barplayer container'}>
        <div className={'ui grid'}>
          <div id="barPlayerRow" className="row">
            <div className="ten wide column">
              <div className="content">
                <h3>{ song.title }</h3>
              </div>
              <div className="right float content">
                <h4>{ song.artist }</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    song : state.playedSong
  }
};

export default connect(mapStateToProps)(BarPlayer);;