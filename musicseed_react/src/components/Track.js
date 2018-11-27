import React, {Component, Fragment} from 'react';
import {Dropdown, Grid, Image, Select, Form} from "semantic-ui-react";

class Track extends Component {

  state = { titleSong: '' };

  onLPClick = async (event, index) => {
    await this.setState({ titleSong: index });
    console.log(this.state.titleSong);
  };

  setLP(index) {
    if(index === this.state.titleSong ){
      return 'images/LP_selected.png';
    } else {
      return 'images/LP.png';
    }
  }

  roleOptions = [
    { key: 'f', text: 'Featuring', value: 'featuring' },
    { key: 'p', text: 'Producer', value: 'producer' },
    { key: 'r', text: 'Rapping', value: 'rapping' },
  ];

  genreOptions = [
    { key: 'hh', text: 'Hip-hop', value: 'hiphop' },
    { key: 'bld', text: 'Ballad', value: 'ballad' },
    { key: 'jzz', text: 'Jazz', value: 'jazz' },
    { key: 'acst', text: 'Acoustic', value: 'acoustic' },
    { key: 'rck', text: 'Rock', value: 'rock' },
    { key: 'lf', text: 'Lo-fi', value: 'lo-fi' },
    { key: 'bnd', text: 'Band', value: 'band' },
  ];

  renderTrack(index){
    return(
      <Grid className={'track'} >
        <Grid.Column width={5}>
          <Image src={ this.setLP(index) } onClick={ e => this.onLPClick(e, index) }/>
        </Grid.Column>
        <Grid.Column width={3} className={'track_label'}>
          <h1>Title</h1>
          <h1>Artist</h1>
          <h1>Genre</h1>
          <h1>File</h1>
          <h1>Participants</h1>
        </Grid.Column>
        <Grid.Column width={8}>
          <input placeholder={'Track Title'} />
          <input placeholder={'Artist Name'} />
          <Dropdown placeholder='Genre' fluid multiple search selection options={this.genreOptions} />
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile"/>
            <label className="custom-file-label" htmlFor="customFile">&nbsp;&nbsp;Click to choose the file</label>
          </div>
          <Grid>
            <Grid.Column width={8}>
              <input placeholder={'Name'}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field
                control={Select}
                options={this.roleOptions}
                placeholder='Role'
                search
                searchInput={{ id: 'form-select-control-gender' }}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }

  render() {
    return (
      <Fragment>
        { this.renderTrack(this.props.index) }
      </Fragment>
    );
  }
}

export default Track;