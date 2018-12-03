import React, { Fragment } from "react";
import { connect } from "react-redux";
import { songOrder } from "../../actions";
import "../../styles/BarPlayer.css";
import { buttonPaths } from "../../utility";

class BarPlayer extends React.Component {
  render() {
    return (
      <Fragment>
        <audio controls>
          <source src={this.setPath()} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        {this.renderSong(this.props.order)}
      </Fragment>
    );
  }

  setPath() {
    return "http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3";
  }

  onButtonClick() {
    const audio = document.querySelector("audio");
    console.log(audio.duration);
    audio.pause();
  }

  setSongStatus = async (order, button) => {
    const newOrder = {
      song: order.song
    };
    const audio = document.querySelector('audio');
    switch (button) {
      case buttonPaths.pause:
        newOrder.status = "pause";
        audio.pause();
        break;
      case buttonPaths.play:
        newOrder.status = "play";
        audio.play();
        break;
      case buttonPaths.stop:
        newOrder.status = "stop";
        await audio.load();
        audio.pause();
        break;
      default:
    }
    this.props.songOrder(newOrder);
  };

  renderButtons = order => {
    const buttonPath =
      order.status === "play" ? buttonPaths.pause : buttonPaths.play;
    return (
      <div className="three wide column">
        <a href={"#"}>
          <img src={buttonPaths.prev} alt="previous button" />
        </a>
        <a href={"#"} onClick={() => this.setSongStatus(order, buttonPath)}>
          <img src={buttonPath} alt="pause button" />
        </a>
        <a
          href={"#"}
          onClick={() => this.setSongStatus(order, buttonPaths.stop)}
        >
          <img src={buttonPaths.stop} alt="stop button" />
        </a>
        <a href={"#"}>
          <img src={buttonPaths.next} alt="next button" />
        </a>
        <a href={"#"}>
          <img src={buttonPaths.list} alt="list button" />
        </a>
      </div>
    );
  };

  renderSong = order => {
    if (order) {
      return (
        <div className={"barplayer container"}>
          <div className={"ui grid"}>
            <div id="barPlayerRow" className="row">
              <div className="thirteen wide column">
                <div className="content">
                  <h3>{order.song.title}</h3>
                </div>
                <div className="right float content">
                  <h4>{order.song.artist}</h4>
                </div>
              </div>
              <Fragment>{this.renderButtons(order)}</Fragment>
            </div>
          </div>
        </div>
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    order: state.songOrdered,
    path: state.getPath
  };
};

export default connect(
  mapStateToProps,
  { songOrder }
)(BarPlayer);
