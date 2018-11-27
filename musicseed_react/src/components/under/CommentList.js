import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Comment} from "semantic-ui-react";
import faker from "faker";
import moment from 'moment';
import {addComment, typeComment} from "../../actions";
import MsComment from "./MSComment";
import {commentsSort} from "../../utility/";

class CommentList extends Component {
  render() {
    return (
      <Fragment>
        {this.renderCommentsList()}
      </Fragment>
    );
  }

  renderCommentsList(){
    const sortedComments = commentsSort(this.props.comments);
    const comments = sortedComments.map(comment => {
      return <MsComment key={comment.username} comment={comment} />
    });

    return(
      <div className={'under_field'}>
        <h1>Comments</h1>
        <Comment.Group size={'large'}>

          { comments }

        </Comment.Group>
        <Form onSubmit={ () => this.onCommentSubmit()}>
          <Form.TextArea onChange={e => this.onTextAreaChange(e.target.value)} value={ this.props.commentTyped }/>
          <Button type={'submit'} content='Add Reply' labelPosition='left' icon='edit' />
        </Form>
      </div>
    )
  }

  onTextAreaChange = (text) => {
    this.props.typeComment(text);
  };

  onCommentSubmit = () => {
    const comment = {
      image: faker.image.avatar(),
      username: faker.name.firstName(),
      time: moment().format(),
      body: this.props.commentTyped
    };
    this.props.addComment(comment);
  }
}

const mapStateToProps = state => {
  return {
    commentTyped: state.commentTyped,
    comments: state.comments
  }
};

export default connect(
  mapStateToProps,
  {addComment, typeComment}
)(CommentList);