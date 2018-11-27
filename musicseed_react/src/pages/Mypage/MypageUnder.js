import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid, Image, Comment, Table, Form, Button, Menu, Icon} from 'semantic-ui-react';

import '../../styles/UnderDiv.css';

class UploadAlbumUnder extends Component {
  render() {

    return (
      <div className={'under_div'}>
        <div className={'under_field'}>
          <h1>Receipts</h1>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Registration Date</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Premium Plan</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                <Table.Cell>No</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie Harington</Table.Cell>
                <Table.Cell>January 11, 2014</Table.Cell>
                <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill Lewis</Table.Cell>
                <Table.Cell>May 11, 2014</Table.Cell>
                <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>

        <div className={'under_field'}>
          <h1>Albums</h1>
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
              <Grid.Column className="item_album">
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' rounded />
                <h4>Album Title</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

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
          <Form>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' />
          </Form>
        </div>
        <div className={'under_button_area'}>
          <Button href={'#'} className="ui large button" >TOP</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    numberOfTracks: state.numberOfTracks,
  }
};

export default connect(
  mapStateToProps,
)(UploadAlbumUnder);