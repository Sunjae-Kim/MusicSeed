import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommentList from "../../components/under/CommentList";
import Participants from "../../components/under/Participants";
import AlbumDescription from "../../components/under/AlbumDescription";
import CenteredButton from "../../components/under/CenteredButton";

class AlbumDetailUnder extends Component {
  render() {
    return (
        <div className={'under_div'}>
          <AlbumDescription description={ this.props.getAlbum.album.description } />
          {/* <Participants/> */}
          <CommentList/>
          <CenteredButton buttonText={'TOP'}/>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    getAlbum: state.getAlbum,
  }
};

export default connect(
  mapStateToProps,
)(AlbumDetailUnder);