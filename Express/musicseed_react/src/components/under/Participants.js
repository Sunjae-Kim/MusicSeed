import React, {Component, Fragment} from 'react';
import {Image, Card, Grid} from "semantic-ui-react";

class Participants extends Component {
  render() {
    return (
      <Fragment>
        { this.renderParticipants() }
      </Fragment>
    );
  }
  renderParticipants(){
    return(
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
    )
  }
}

export default Participants;