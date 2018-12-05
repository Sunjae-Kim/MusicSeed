import React, { Fragment } from "react";
import { connect } from "react-redux";
import { songOrder } from "../../actions";
import "../../styles/BarPlayer.css";
import { buttonPaths } from "../../utility";
import _ from 'underscore';
import moment from 'moment';
import axios from "axios";

class BarPlayer extends React.Component {
  render() {
    return (
      <Fragment>
        <audio controls id="audioPlayer">
          <source
            src={!this.props.order ? null : this.props.order.song.file}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
        {this.renderSong(this.props.order)}
      </Fragment>
    );
  }

  componentDidUpdate() {
    const audio = document.querySelector("#audioPlayer");
    console.log(this.props.order);
    if (this.props.order) {
      console.log('in')
      switch (this.props.order.status) {
        case "load":
          audio.load();
          const order = _.identity(this.props.order)
          order.status = 'play';
          this.props.songOrder(order);
          break;
        case "play":
          audio.play();
          break;
        case "pause":
          audio.pause();
          break;
        case "stop":
          audio.load();
          audio.pause();
          break;
        default:
      }
    }
  }

  setSongStatus = async (order, button) => {
    const newOrder = {
      song: order.song
    };
    const audio = document.querySelector("#audioPlayer");
    switch (button) {
      case buttonPaths.pause:
        newOrder.status = "pause";
        break;
      case buttonPaths.play:
        newOrder.status = "play";
        break;
      case buttonPaths.stop:
        newOrder.status = "stop";
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
    path: state.getPath,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { songOrder }
)(BarPlayer);
