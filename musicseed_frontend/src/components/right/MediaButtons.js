import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  addSongToPlaylist,
  downloadSong,
  songOrder,
  deleteSongFromPlaylist,
  setPlaylist,
  setShuffledList
} from "../../actions/index";
import "../../styles/MediaButtons.css";
import _ from "underscore";

class MediaButtons extends React.Component {
  async onSearchPlayButtonClick(song) {
    song.index = this.props.getPlaylist.length;
    await this.props.addSongToPlaylist(song);
    this.props.setShuffledList(_.shuffle(this.props.getPlaylist));
    const order = {
      song,
      status: "load",
      index: this.props.getPlaylist.length - 1
    };
    const source = await document.querySelector("source");
    const src = order.song.file;
    if (!source.hasAttribute("src")) {
      source.setAttribute("src", src);
    }
    this.props.songOrder(order);
    console.log(this.props.order);
  }

  async onPlaylistPlayButtonClick(song) {
    const order = {
      song,
      status: "load",
      index: this.props.index
    };
    const source = await document.querySelector("source");
    const src = order.song.file;
    if (!source.hasAttribute("src")) {
      source.setAttribute("src", src);
    }
    this.props.songOrder(order);
    console.log(this.props.order);
  }

  async onAddSongToPlaylistClick(song) {
    song.index = this.props.getPlaylist.length;
    await this.props.addSongToPlaylist(song);
    this.props.setShuffledList(_.shuffle(this.props.getPlaylist));
  }

  renderSearchButtons() {
    return (
      <div className={"mediabuttons six wide column"}>
        <a
          href="#"
          onClick={() => this.onSearchPlayButtonClick(this.props.song)}
        >
          <img src="images/mediabuttons/play.png" alt="play button" />
        </a>
        <a
          href="#"
          onClick={() => this.onAddSongToPlaylistClick(this.props.song)}
        >
          <img
            src="images/mediabuttons/addtoplaylist.png"
            alt="add to playlist button"
          />
        </a>
        {/*<a*/}
        {/*href="#"*/}
        {/*onClick={() => this.props.downloadSong(this.props.song)}*/}
        {/*>*/}
        {/*<img src="images/mediabuttons/download.png" alt="download button"/>*/}
        {/*</a>*/}
      </div>
    );
  }

  async onDeleteFromListButtonClick() {
    const newOrder = _.identity(this.props.order);
    let newList = _.identity(this.props.getPlaylist);
    if (this.props.song.index !== this.props.order.index) {
      if (this.props.song.index < this.props.order.index) {
        newOrder.index = newOrder.index - 1;
        this.props.songOrder(newOrder);
      }
      newList = newList.filter((song, index) => {
        return index !== this.props.song.index;
      });
      newList = newList.map((song, index) => {
        song.index = index;
        return song;
      });
      await this.props.setPlaylist(newList);
    } else {
      const nextSong = newList.find(
        song => song.index === this.props.order.index + 1
      );
      if (this.props.getPlaylist.length === 1) {
        newOrder.status = "stop";
        newList = [];
        await this.props.setPlaylist(newList);
        this.props.songOrder(newOrder);
      } else if (nextSong) {
        const originalStatus = this.props.order.status;
        newOrder.song = nextSong;
        newOrder.status = "load";
        newList = newList.filter((song, index) => {
          return index !== this.props.song.index;
        });
        await this.props.songOrder(newOrder);
        if (originalStatus !== "play") {
          newOrder.status = "pause";
          await this.props.songOrder(newOrder);
        }
        newList = newList.map((song, index) => {
          song.index = index;
          return song;
        });
        await this.props.setPlaylist(newList);
      } else {
        const originalStatus = this.props.order.status;
        await this.props.songOrder({
          song: newList[0],
          index: 0,
          status: "load"
        });
        if (originalStatus !== "play") {
          await this.props.songOrder({
            song: newList[0],
            index: 0,
            status: this.props.order.status === "pause"
          });
        }
        newList.pop();
        await this.props.setPlaylist(newList);
      }
    }
    this.props.setShuffledList(_.shuffle(this.props.getPlaylist));
  }

  renderPlaylistButtons() {
    return (
      <div className={"mediabuttons playlist six wide column"}>
        <a
          href="#"
          onClick={() => this.onPlaylistPlayButtonClick(this.props.song)}
        >
          <img src="images/mediabuttons/play.png" alt="play button" />
        </a>
        <a
          href="#"
          onClick={() => this.onDeleteFromListButtonClick(this.props.index)}
        >
          <img
            src="images/mediabuttons/deletefromplaylist.png"
            alt="delete button"
          />
        </a>
      </div>
    );
  }

  render() {
    switch (this.props.playerState) {
      case true:
        return <Fragment>{this.renderSearchButtons()}</Fragment>;
      case false:
        return <Fragment>{this.renderPlaylistButtons()}</Fragment>;
      default:
        return;
    }
  }
}

const mapStateToProps = state => {
  return {
    playerState: state.playerState,
    order: state.songOrdered,
    getPlaylist: state.getPlaylist
  };
};

export default connect(
  mapStateToProps,
  {
    addSongToPlaylist,
    downloadSong,
    songOrder,
    deleteSongFromPlaylist,
    setPlaylist,
    setShuffledList
  }
)(MediaButtons);
