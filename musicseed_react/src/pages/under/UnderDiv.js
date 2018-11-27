import React, {Component, Fragment} from 'react';
import {Form, Grid, Image, Select, Dropdown, Button, Confirm } from 'semantic-ui-react';
import '../../styles/UnderDiv.css';

const roleOptions = [
  { key: 'f', text: 'Featuring', value: 'featuring' },
  { key: 'p', text: 'Producer', value: 'producer' },
  { key: 'r', text: 'Rapping', value: 'rapping' },
];

const genreOptions = [
  { key: 'hh', text: 'Hip-hop', value: 'hiphop' },
  { key: 'bld', text: 'Ballad', value: 'ballad' },
  { key: 'jzz', text: 'Jazz', value: 'jazz' },
  { key: 'acst', text: 'Acoustic', value: 'acoustic' },
  { key: 'rck', text: 'Rock', value: 'rock' },
  { key: 'lf', text: 'Lo-fi', value: 'lo-fi' },
  { key: 'bnd', text: 'Band', value: 'band' },
];

class UnderDiv extends Component {
  render() {
    return (
      <Form className={'under_div'} onSubmit={e => onSubmit(e) }>
        <div className={'under_field'}>
          { this.renderTrack(1) }
          { this.renderTrack(2) }
          { this.renderTrack(3) }
        </div>
        <div className={'under_field'}>
          { this.renderDescription() }
        </div>
        <div className={'under_button_area'}>
          <Button className="ui large button" onClick={this.open}>UPLOAD</Button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
        </div>
      </Form>
    );
  }

  state = { open: false, titleSong: '' };
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
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
            <Dropdown placeholder='Genre' fluid multiple search selection options={genreOptions} />
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
                options={roleOptions}
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

  renderDescription = () => {
    return(
      <Fragment>
        <h2 className={'upload_header'}>Album Description</h2>
          <div className={'description'}>
            <Form.TextArea className={'text_area'}/>
          </div>
      </Fragment>
    )
  };
}




const setTitleSong = (event) => {
  console.log(`Set Title Song ${event}`)
};

const onSubmit = (event) => {
  event.preventDefault();
};

export default UnderDiv;