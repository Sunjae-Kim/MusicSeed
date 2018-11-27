import React, {Component} from 'react';
import CommentList from "../../components/under/CommentList";
import Participants from "../../components/under/Participants";
import AlbumDescription from "../../components/under/AlbumDescription";
import {lorem} from 'faker';
import CenteredButton from "../../components/under/CenteredButton";

class AlbumDetailUnder extends Component {
  render() {
    return (
        <div className={'under_div'}>
          <AlbumDescription description={ lorem.paragraphs() } />
          <Participants/>
          <CommentList/>
          <CenteredButton buttonText={'TOP'}/>
        </div>
    );
  }
}

export default AlbumDetailUnder;