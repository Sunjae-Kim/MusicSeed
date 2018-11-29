import React, {Component, Fragment} from 'react';
import {Image, Grid} from "semantic-ui-react";

class AlbumList extends Component {
  render() {
    return (
      <Fragment>
        { this.renderAlbumList() }
      </Fragment>
    );
  }

  renderAlbumList(){
    return(
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
    )
  }
}

export default AlbumList;