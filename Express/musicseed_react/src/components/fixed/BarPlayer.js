import React, { Fragment } from "react";
import { connect } from "react-redux";
import { songOrder, setPlaylist } from "../../actions";
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
      isOneSongRepeat: false
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

  shuffledList = [];

  onAudioEnded() {
    console.log("song ended");

    if(this.state.isOneSongRepeat){

    }
    else {
      this.setSongStatus(this.props.order, buttonPaths.next);
    }
  }

  componentDidUpdate() {

    this.shuffledList = _.shuffle(this.props.getPlaylist);

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
        if(this.state.isShuffled){
          const nextIndex = this.props.getPlaylist.find(
            song => song.index === order.index + 1
          ) ? order.index + 1 : 0;
          newOrder.song = this.shuffledList.find((song, index) => {
              if(nextIndex === index){
                newOrder.index = song.index;
              }
              return nextIndex === index;
            }
          );
          newOrder.status = 'load';
          this.props.songOrder(newOrder);
        } else {
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
        }
        break;
      case buttonPaths.prev:
        flag = this.props.getPlaylist.find(
          song => song.index === order.index - 1
        )
          ? true
          : false;
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
    const isShuffled = this.state.isShuffled ? "active" : "";
    const isOneSongRepeat = this.state.isOneSongRepeat ? "active" : "";
    return (
      <div className="right floated column">
        <i
          className={this.renderMuteButton()}
          onClick={this.onMuteButtonChange}
        />
        <i
          className={`fa fa-repeat ${isOneSongRepeat}`}
          onClick={() =>
            this.setState({ isOneSongRepeat: !this.state.isOneSongRepeat })
          }
        />
        <i
          className={`fa fa-random ${isShuffled}`}
          onClick={() => this.setState({ isShuffled: !this.state.isShuffled })}
        />
          <img
            src={buttonPaths.prev}
            alt="previous button"
            onClick={() => this.setSongStatus(order, buttonPaths.prev)}
          />
          <img
            src={buttonPath}
            alt="pause button"
            onClick={() => this.setSongStatus(order, buttonPath)}
          />
          <img
            src={buttonPaths.stop}
            alt="stop button"
            onClick={() => this.setSongStatus(order, buttonPaths.stop)}
          />
          <img
            src={buttonPaths.next}
            alt="next button"
            onClick={() => this.setSongStatus(order, buttonPaths.next)}
          />
          <img src={buttonPaths.list} alt="list button" />
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
  { songOrder, setPlaylist }
)(BarPlayer);
