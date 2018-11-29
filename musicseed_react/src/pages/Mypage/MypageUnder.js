import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../styles/UnderDiv.css';
import Receipts from "../../components/under/Receipts";
import AlbumList from "../../components/under/AlbumList";
import CommentList from "../../components/under/CommentList";
import CenteredButton from "../../components/under/CenteredButton";

class UploadAlbumUnder extends Component {
  render() {

    return (
      <div className={'under_div'}>
        <Receipts/>
        <AlbumList/>
        <CommentList/>
        <CenteredButton buttonText={'TOP'}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

export default connect(
  mapStateToProps,
)(UploadAlbumUnder);