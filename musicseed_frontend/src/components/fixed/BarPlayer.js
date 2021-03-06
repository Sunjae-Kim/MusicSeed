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
          onTimeUpdate={e => this.onTimeUpdate(e)}
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
      progressBarClasses: [],
      playedTime: 0,
      progress: 0
    };

    this.audio = null;

    this.onAudioEnded = this.onAudioEnded.bind(this);
    this.onMuteButtonChange = this.onMuteButtonChange.bind(this);
    this.renderMuteButton = this.renderMuteButton.bind(this);
    this.stretchProgressBar = this.stretchProgressBar.bind(this);
    this.destretchProgressBar = this.destretchProgressBar.bind(this);
    this.setProgress = this.setProgress.bind(this);
  }

  componentDidMount() {
    this.audio = document.querySelector("#audioPlayer");
  }

  setProgress(e) {
    const target = e.target.nodeName === "DIV" ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.audio.duration;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;
    this.audio.currentTime = currentTime;
    this.setState({
      progress: progress
    });
  }

  onTimeUpdate(e) {
    this.setState({
      progress:
        Math.round((e.target.currentTime / this.state.audioDuration) * 1000) /
        10,
      playedTime: e.target.currentTime
    });
  }

  onAudioDurationChange(e) {
    if (this.props.order.status !== "stop") {
      this.setState({ audioDuration: e.currentTarget.duration });
    }
  }

  onAudioEnded() {
    console.log("song ended");
    if (this.state.isOneSongRepeat) {
      const newOrder = _.identity(this.props.order);
      newOrder.status = "load";
      this.props.songOrder(newOrder);
    } else {
      this.setSongStatus(this.props.order, buttonPaths.next);
    }
  }

  componentDidUpdate() {
    if (this.props.order) {
      switch (this.props.order.status) {
        case "load":
          this.audio.load();
          this.audioDuration = this.audio.duration;
          const order = _.identity(this.props.order);
          order.status = "play";
          this.props.songOrder(order);
          break;
        case "play":
          this.audio.play();
          break;
        case "pause":
          this.audio.pause();
          break;
        case "stop":
          this.audio.load();
          this.audio.pause();
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
        if (this.state.isShuffled) {
          const newShuffledList = _.identity(this.props.getShuffledList);

          const nextIndex = newShuffledList.find(
            song =>
              song.index ===
              _.indexOf(newShuffledList, this.props.order.song) + 1
          )
            ? _.indexOf(newShuffledList, this.props.order.song) + 1
            : 0;

          newOrder.song = newShuffledList.find((song, index) => {
            return nextIndex === index;
          });

          newOrder.index = newOrder.song.index;
          newOrder.status = "load";
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
            newOrder.song = this.props.getPlaylist.find(
              song => song.index === 0
            );
            newOrder.index = 0;
          }
          newOrder.status = "load";
          this.props.songOrder(newOrder);
        }
        break;
      case buttonPaths.prev:
        if (this.state.isShuffled) {
          const newShuffledList = _.identity(this.props.getShuffledList);

          const prevIndex = newShuffledList.find(
            song =>
              song.index ===
              _.indexOf(newShuffledList, this.props.order.song) - 1
          )
            ? _.indexOf(newShuffledList, this.props.order.song) - 1
            : newShuffledList.length - 1;

          newOrder.song = newShuffledList.find((song, index) => {
            return prevIndex === index;
          });

          newOrder.index = newOrder.song.index;
          newOrder.status = "load";
          this.props.songOrder(newOrder);
        } else {
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
        }

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

  async stretchProgressBar() {
    const progress = new Array();
    progress.push(await document.querySelector(".barplayer.upper"));
    progress.push(
      await document.querySelector(".barplayer.upper .ui.top.attached.progress")
    );
    progress.push(
      await document.querySelector(
        ".barplayer.upper .ui.top.attached.progress .bar"
      )
    );

    progress.forEach(async (element, index) => {
      const clone = _.identity(this.state.progressBarClasses);
      clone[index] = element.getAttribute("class");
      element.setAttribute(
        "class",
        this.state.progressBarClasses[index] + " active"
      );
      await this.setState({ progressBarClasses: clone });
    });
  }

  async destretchProgressBar() {
    const progress = new Array();
    progress.push(await document.querySelector(".barplayer.upper"));
    progress.push(
      await document.querySelector(".barplayer.upper .ui.top.attached.progress")
    );
    progress.push(
      await document.querySelector(
        ".barplayer.upper .ui.top.attached.progress .bar"
      )
    );

    progress.forEach(async (element, index) => {
      element.setAttribute("class", this.state.progressBarClasses[index]);
    });
  }

  renderSong = order => {
    if (order) {
      return (
        <Fragment>
          <div
            className={"barplayer wrapper"}
            onMouseOver={this.stretchProgressBar}
            onMouseOut={this.destretchProgressBar}
          >
            <div className={"barplayer upper"}>
              <div
                className={"ui top attached progress"}
                onClick={this.setProgress}
              >
                <div
                  className={"bar"}
                  style={{
                    transitionDuration: "300ms",
                    width: this.state.progress + "%"
                  }}
                >
                  <i className={"fa fa-square"} />
                </div>
              </div>
            </div>
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
                        <span className="duration changing">
                          {" "}
                          {moment()
                            .startOf("day")
                            .seconds(this.state.playedTime)
                            .format("mm:ss")}
                        </span>
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
          </div>
        </Fragment>
      );
    }
  };

  onMuteButtonChange = async () => {
    await this.setState({ isMuted: !this.state.isMuted });
    this.state.isMuted ? (this.audio.muted = true) : (this.audio.muted = false);
  };
  renderMuteButton = () => {
    const button = this.state.isMuted ? "fa fa-volume-off" : "fa fa-volume-up";
    return button;
  };
}

const mapStateToProps = state => {
  return {
    order: state.songOrdered,
    path: state.getPath,
    getPlaylist: state.getPlaylist,
    getShuffledList: state.getShuffledList
  };
};

export default connect(
  mapStateToProps,
  { songOrder, setPlaylist }
)(BarPlayer);
