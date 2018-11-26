import React, {Component, Fragment} from 'react';
import {Form, Grid, Image} from 'semantic-ui-react';
import '../../styles/UnderDiv.css';

class UnderDiv extends Component {
  render() {
    return (
      <div className={'under_div'}>
        <div className={'under_field'}>
          <h1>Test Field</h1>
          { this.renderTrack() }
        </div>
        <button className="ui button" type="submit">LOGIN</button>
      </div>
    );
  }

  renderTrack(){
    return(
      <Form onSubmit={e => onSubmit(e) }>
      <Grid className={'track'} >
        <Grid.Column width={6}>
          <Image src='images/LP.png' />
        </Grid.Column>
        <Grid.Column width={4} className={'track_label'}>
          <h1>Title</h1>
          <h1>Artist</h1>
          <h1>Genre</h1>
          <h1>File</h1>
          <h1>Participants</h1>
        </Grid.Column>
        <Grid.Column width={6}>
            <input placeholder="Album Title" />
            <input placeholder="Album Title" />
            <input placeholder="Album Title" />
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="customFile"/>
              <label className="custom-file-label" htmlFor="customFile">&nbsp;&nbsp;Artwork</label>
            </div>
            <input placeholder="Album Title" />
        </Grid.Column>
      </Grid>
      </Form>
    )
  }
}

const onSubmit = (event) => {
  event.preventDefault();
};

export default UnderDiv;