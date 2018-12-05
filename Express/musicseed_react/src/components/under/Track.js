import React, {Component, Fragment} from 'react';
import {Dropdown, Form, Grid, Image, Select} from "semantic-ui-react";
import {connect} from 'react-redux';
import {setTitleSong} from '../../actions'

class Track extends Component {

  setLP(index) {
    if(index === this.props.titleSong ){
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
          <Image src={ this.setLP(index) } onClick={ () => this.props.setTitleSong(index) }/>
        </Grid.Column>
        <Grid.Column width={3} className={'track_label'}>
          <h1>Title</h1>
          <h1>Artist</h1>
          <h1>Genre</h1>
          <h1>File</h1>
          <h1>Participant</h1>
        </Grid.Column>
        <Grid.Column width={8}>
          <input placeholder={'Track Title'}
                 value={this.props.state.tracks[index-1].title}
                 onChange={e => this.props.onChange.onTitleChange(e, index)}
          />
          <input placeholder={'Artist Name'}
                 value={this.props.state.tracks[index-1].artist}
                 onChange={e => this.props.onChange.onArtistChange(e, index)}
          />
          <Dropdown
            placeholder='Genre'
            fluid multiple search selection
            options={this.genreOptions}
            onChange={() => this.props.onChange.onGenresChange(index)}
            id={`genreSelector${index}`}
          />
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={e => this.props.onChange.onFileInputChange(e, index)}
            />
            <label className="custom-file-label" htmlFor="customFile">
              { this.props.state.tracks[index-1].file || 'Click to choose the file' }
              <audio 
                id={`dummy_audio${index}`}
                onDurationChange={ e => this.props.onChange.onAudioDurationChange(e, index)}
              >
                <source id={`dummy_source${index}`} src="" type="audio/mpeg" />
              </audio>
            </label>
          </div>
          <Grid>
            <Grid.Column width={8}>
              <input
                placeholder={'Name'}
                onChange={e => this.props.onChange.onParticipantsNameChange(e,index)}
                value={this.props.state.tracks[index-1].participants.name}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field
                control={Select}
                options={this.roleOptions}
                placeholder='Role'
                search
                onChange={e => this.props.onChange.onParticipantsRoleChange(e, index)}
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

const mapStateToProps = state => {
  return {
    titleSong: state.titleSong
  }
};

export default connect(
  mapStateToProps,
  {setTitleSong}
)(Track);