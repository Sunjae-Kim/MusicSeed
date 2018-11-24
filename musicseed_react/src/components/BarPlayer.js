import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import "../styles/BarPlayer.css";

const BarPlayer = (props) => {
  switch (props.path) {
    case 'player':
      return <Fragment></Fragment>;
    default:
      return (
        <Fragment>
          { renderSong(props.song) }
        </Fragment>
      );
  }
};

const renderButtons = () => {
  return(
    <div className="three wide column">
      <a
        href={'#'}
      >
        <img src="images/mediabuttons/prev.png" alt="previous button"/>
      </a>
      <a
        href={'#'}
      >
        <img src="images/mediabuttons/pause.png" alt="pause button"/>
      </a>
      <a
        href={'#'}
      >
        <img src="images/mediabuttons/stop.png" alt="stop button"/>
      </a>
      <a
        href={'#'}
      >
        <img src="images/mediabuttons/next.png" alt="next button"/>
      </a>
      <a
        href={'#'}
      >
        <img src="images/mediabuttons/list.png" alt="list button"/>
      </a>
    </div>
  )
};

const renderSong = song => {
  if(song){
    return(
      <div className={'barplayer container'}>
        <div className={'ui grid'}>
          <div id="barPlayerRow" className="row">
            <div className="thirteen wide column">
              <div className="content">
                <h3>{ song.title }</h3>
              </div>
              <div className="right float content">
                <h4>{ song.artist }</h4>
              </div>
            </div>
            <Fragment>
              { renderButtons() }
            </Fragment>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    song : state.playedSong,
    path : state.getPath
  }
};

export default connect(
  mapStateToProps
)(BarPlayer);