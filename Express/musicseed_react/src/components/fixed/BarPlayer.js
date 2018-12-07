import React, { Fragment } from "react";
import { connect } from "react-redux";
import { songOrder } from "../../actions";
import "../../styles/BarPlayer.css";
import { buttonPaths } from "../../utility";
import _ from "underscore";
import moment from "moment";
import axios from "axios";

class BarPlayer extends React.Component {
  render() {
    return (
      <Fragment>
        <audio
          controls
          id="audioPlayer"
          onDurationChange={e => this.onAudioDurationChange(e)}
          onEnded={this.onAudioEnded}
        >
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

  constructor(props) {
    super(props);
    this.state = {
      audioDuration: 0,
      isMuted: false,
      isShuffled: false,
      isOneSongRepeat: false,
    };

    this.onAudioEnded = this.onAudioEnded.bind(this);
    this.onMuteButtonChange = this.onMuteButtonChange.bind(this);
    this.renderMuteButton = this.renderMuteButton.bind(this);
  }

  onAudioDurationChange(e) {
    if (this.props.order.status !== "stop") {
      this.setState({ audioDuration: e.currentTarget.duration });
    }
  }

  onAudioEnded() {
    console.log("song ended");
    const order = this.props.order;
    const newOrder = {};
    const flag = this.props.getPlaylist.find(
      song => song.index === order.index + 1
    )
      ? true
      : false;
    if (flag) {
      newOrder.song = this.props.getPlaylist.find(
        song => song.index === order.index + 1
      );
      newOrder.index = order.index + 1;
    } else {
      newOrder.song = this.props.getPlaylist.find(song => song.index === 0);
      newOrder.index = 0;
    }
    newOrder.status = "load";
    this.props.songOrder(newOrder);
  }

  componentDidUpdate() {
    const audio = document.querySelector("#audioPlayer");
    console.log(this.props.order);
    if (this.props.order) {
      switch (this.props.order.status) {
        case "load":
          audio.load();
          this.audioDuration = audio.duration;
          const order = _.identity(this.props.order);
          order.status = "play";
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
      song: order.song,
      index: order.index
    };
    let flag;
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
      case buttonPaths.next:
        flag = this.props.getPlaylist.find(
          song => song.index === order.index + 1
        )
          ? true
          : false;
        if (flag) {
          newOrder.song = this.props.getPlaylist.find(
            song => song.index === order.index + 1
          );
          newOrder.index = order.index + 1;
        } else {
          newOrder.song = this.props.getPlaylist.find(song => song.index === 0);
          newOrder.index = 0;
        }
        newOrder.status = "load";
        this.props.songOrder(newOrder);
        break;
      case buttonPaths.prev:
        flag = this.props.getPlaylist.find(
          song => song.index === order.index - 1
        ) ? true : false;
        if (flag) {
          newOrder.song = this.props.getPlaylist.find(
            song => song.index === order.index - 1
          );
          newOrder.index = order.index - 1;
        } else {
          newOrder.song = this.props.getPlaylist.find(
            song => song.index === this.props.getPlaylist.length - 1
          );
          newOrder.index = this.props.getPlaylist.length - 1;
        }
        newOrder.status = "load";
        break;
      default:
    }
    this.props.songOrder(newOrder);
  };

  renderButtons = order => {
    const buttonPath =
      order.status === "play" ? buttonPaths.pause : buttonPaths.play;
    return (
      <div className="right floated column">
                          <i
                      className={this.renderMuteButton()}
                      onClick={this.onMuteButtonChange}
                    />
                    <i
                      className={'fa fa-repeat'}
                      // onClick={this.onMuteButtonChange}
                    />
                    <i
                      className={'fa fa-random'}
                      // onClick={this.onMuteButtonChange}
                    />
        <a
          href={"#"}
          onClick={() => this.setSongStatus(order, buttonPaths.prev)}
        >
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
        <a
          href={"#"}
          onClick={() => this.setSongStatus(order, buttonPaths.next)}
        >
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
            <div id="barPlayerRow" className="two column row">
              <div className="left floated column">
                <div className="content">
                  <h3>{order.song.title}</h3>
                </div>
                <div className="right float content">
                  <h4>
                    {order.song.artist}{" "}
                    <span className="duration">
                      {" "}
                      {moment()
                        .startOf("day")
                        .seconds(this.state.audioDuration)
                        .format("mm:ss")}
                    </span>
                  </h4>
                </div>
              </div>
              <Fragment>{this.renderButtons(order)}</Fragment>
            </div>
          </div>
        </div>
      );
    }
  };

  onMuteButtonChange = async () => {
    const audio = document.querySelector("#audioPlayer");
    await this.setState({ isMuted: !this.state.isMuted });
    this.state.isMuted ? (audio.muted = true) : (audio.muted = false);
  };
  renderMuteButton = () => {
    const button = this.state.isMuted ? "fa fa-volume-mute" : "fa fa-volume-up";
    return button;
  };
}

const mapStateToProps = state => {
  return {
    order: state.songOrdered,
    path: state.getPath,
    getPlaylist: state.getPlaylist
  };
};

export default connect(
  mapStateToProps,
  { songOrder }
)(BarPlayer);
