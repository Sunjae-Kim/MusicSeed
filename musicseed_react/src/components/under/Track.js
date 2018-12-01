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


  componentDidMount(){
  }

  componentDidUpdate(){
    console.log(this.state);
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
          <h1>Participants</h1>
        </Grid.Column>
        <Grid.Column width={8}>
          <input placeholder={'Track Title'}
                 value={this.state.title}
                 onChange={this.onTitleChange}
          />
          <input placeholder={'Artist Name'}
                 value={this.state.artist}
                 onChange={this.onArtistChange}
          />
          <Dropdown
            placeholder='Genre'
            fluid multiple search selection
            options={this.genreOptions}
            onChange={this.onGenresChange}
            id={`genreSelector${index}`}
          />
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" onChange={this.onFileInputChange}/>
            <label className="custom-file-label" htmlFor="customFile">{ this.state.file || 'Click to choose the file' }</label>
          </div>
          <Grid>
            <Grid.Column width={8}>
              <input
                placeholder={'Name'}
                onChange={this.onParticipantsNameChange}
                value={this.state.participants.name}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field
                control={Select}
                options={this.roleOptions}
                placeholder='Role'
                search
                onChange={this.onParticipantsRoleChange}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      index: this.props.index,
      title: '',
      artist: '',
      genres: [],
      file: '',
      participants: {
        name: '',
        role: ''
      },
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onArtistChange = this.onArtistChange.bind(this);
    this.onGenresChange = this.onGenresChange.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onParticipantsNameChange = this.onParticipantsNameChange.bind(this);
    this.onParticipantsRoleChange = this.onParticipantsRoleChange.bind(this);
  }

  onFileInputChange(evnet) {
    const fullname = evnet.target.value;
    const file = fullname.substring(fullname.indexOf('\\', 3)+1, fullname.length);
    this.setState({file: file});
  }

  onTitleChange(event){
    this.setState({title: event.target.value});
  };

  onArtistChange(event){
    this.setState({artist: event.target.value});
  }

  onParticipantsRoleChange(event){
    if(!event.target.querySelector('.text')) {
      alert('Error: an error occurred, Please choose again..');
      return;
    }
    const role = event.target.querySelector('.text').innerHTML;
    this.setState({participants: {
        name: this.state.participants.name,
        role: role
      }});
  }

  onParticipantsNameChange(event){
    this.setState({participants: {
      name: event.target.value,
        role: this.state.participants.role
      }});
  }

  async onGenresChange(){
    await this.setState({genres: null});
    this.getChildNodes()
      .then(test => {
        const genres = test.map(element => {
          return element.text;
        });
        this.setState({genres});
      });
  }

  async getChildNodes() {
    return await Array.prototype.slice.call(document.querySelectorAll('a.ui.label'));
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