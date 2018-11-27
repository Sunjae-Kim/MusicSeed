import React, {Component} from 'react';
import {Grid, Image, Card, Button, Comment, Form} from 'semantic-ui-react';

class AlbumDetailUnder extends Component {
  render() {
    return (
      <div>
        <div className={'under_div'}>
          <div className={'under_field'}>
            <h2>Album Description</h2>
            <p>
              The first Vision was created by the writer-artist team of Joe Simon and Jack Kirby in Marvel Mystery Comics #13 (Nov. 1940). A mystical, extra-dimensional police officer, The Vision was published by Marvel predecessor Timely Comics during the 1930s and 1940s, a period which fans and historians call the Golden Age of Comic Books.

              Decades later, editor Stan Lee and writer Roy Thomas decided to add a new team member to the superhero-team series The Avengers. Thomas wanted to bring back the Golden Age Vision, but Lee was set on introducing an android member. Thomas ultimately compromised by using a new, android Vision.[1] The second Vision first appeared in The Avengers #57 (Oct. 1968). Thomas wanted the character to be white as befitting his ghostly name, but printing limitations of the time would have rendered him colorless, with un-inked paper where his skin should be. He settled on red as he did not want Vision to be green like the Hulk or blue like the Atlanteans.[2] The character has been compared with Spock from Star Trek, but Thomas said that he was barely aware of the TV series at the time.[3] He acknowledged being influenced by the Adam Link character by Otto Binder, one of the first robots treated as a sympathetic character rather than as a mechanical tool.[3]
            </p>
          </div>
        </div>
        <div className={'under_div'}>
          <div className={'under_field'}>
            <h2>Participants</h2>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <Card>
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                    <Card.Content>
                      <Card.Header>Daniel</Card.Header>
                      <Card.Meta>Joined in 2016</Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column>
                  <Card>
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                    <Card.Content>
                      <Card.Header>Daniel</Card.Header>
                      <Card.Meta>Joined in 2016</Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column>
                  <Card>
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                    <Card.Content>
                      <Card.Header>Daniel</Card.Header>
                      <Card.Meta>Joined in 2016</Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className={'under_div'}>

        <div className={'under_field'}>
          <h1>Comments</h1>
          <Comment.Group size={'large'}>

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
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>This has been very useful for my research. Thanks as well!</p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>Elliot you are always so right :)</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
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
          <Form reply>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' />
          </Form>
        </div>
        </div>
        <div className={'under_button_area'}>
          <Button href={'#'} className="ui large button" >TOP</Button>
        </div>
      </div>
    );
  }
}

export default AlbumDetailUnder;