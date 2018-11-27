import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Comment} from "semantic-ui-react";
import faker from "faker";
import moment from 'moment';
import {addComment, typeComment} from "../../actions";
import MsComment from "./MSComment";

class CommentList extends Component {
  render() {
    return (
      <Fragment>
        {this.renderCommentsList()}
      </Fragment>
    );
  }

  renderCommentsList(){
    let comments = [];
    if(this.props.comments.length !== 0){
      comments = this.props.comments.map(comment => {
        return <MsComment key={comment.username} comment={comment} />
      })
    }

    return(
      <div className={'under_field'}>
        <h1>Comments</h1>
        <Comment.Group size={'large'}>

          { comments }

          <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

        </Comment.Group>
        <Form onSubmit={ () => this.onCommentSubmit()}>
          <Form.TextArea onChange={e => this.onTextAreaChange(e.target.value)} value={ this.props.commentTyped }/>
          <Button type={'submit'} content='Add Reply' labelPosition='left' icon='edit' />
        </Form>
      </div>
    )
  }

  componentDidUpdate(){
    // console.log(this.props.commentTyped)
  }

  onTextAreaChange = (text) => {
    this.props.typeComment(text);
  };

  onCommentSubmit = () => {
    console.log('COMMENT ADDED');
    const comment = {
      image: faker.image.avatar(),
      username: faker.name.firstName(),
      time: moment().format(),
      body: this.props.commentTyped
    };
    console.log(comment);
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