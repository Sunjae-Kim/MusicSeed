import React, {Component} from 'react';
import {Comment} from 'semantic-ui-react';
import moment from 'moment';


class MsComment extends Component {
  render() {
    const {username, time, body, image} = this.props.comment;
    return (
      <Comment>
        <Comment.Avatar src={ image } />
        <Comment.Content>
          <Comment.Author as='a'>{ username }</Comment.Author>
          <Comment.Metadata>
            <div>{ moment(time).fromNow() }</div>
          </Comment.Metadata>
          <Comment.Text>{ body }</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Delete</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

export default MsComment;