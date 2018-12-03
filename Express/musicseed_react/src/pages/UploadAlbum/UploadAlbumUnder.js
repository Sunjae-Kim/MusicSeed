import React, {Component, Fragment} from 'react';
import {Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {addTrackInAlbum, setAlbum, setAlbumDescription} from "../../actions/index";
import _ from 'underscore';
import '../../styles/UnderDiv.css';
import Track from "../../components/under/Track";
import axios from 'axios';

class UploadAlbumUnder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tracks : [{
        index: 1,
        title: '',
        artist: '',
        genres: [],
        file: '',
        fileStatus: { 
          selectedFile: null, 
          loaded: 0, 
        },
        participants: {
          name: '',
          role: ''
        }
      }]
    };


    this.onChange.onTitleChange = this.onChange.onTitleChange.bind(this);
    this.onChange.onArtistChange = this.onChange.onArtistChange.bind(this);
    this.onChange.onFileInputChange = this.onChange.onFileInputChange.bind(this);
    this.onChange.onGenresChange = this.onChange.onGenresChange.bind(this);
    this.onChange.onParticipantsNameChange = this.onChange.onParticipantsNameChange.bind(this);
    this.onChange.onParticipantsRoleChange = this.onChange.onParticipantsRoleChange.bind(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const _path = 'temporary/path'
    const tracks = this.state.tracks.map(track => {
      return {
        title: track.title,
        music_path: `${_path}${track.file}`,
        artwork_path: `${_path}${this.props.getAlbumDetail.artwork}`,
        genre: track.genres,
        award: this.props.getAlbumDetail.rewards,
        title_song: this.props.titleSong === track.index,
      }
    })

    const album = {
      album: {
        title: this.props.getAlbumDetail.title,
        upload_date: new Date(),
        description: this.props.getAlbumDescription,
      },
      musics: tracks
    }

    await this.props.setAlbum(
      album
    );
    console.log(this.props.getAlbum);
  };

  addTrack = () => {
    const index = this.props.numberOfTracks+1;
    this.props.addTrackInAlbum(index);
    const newTrack = {
      index: index,
      title: '',
      artist: '',
      genres: [],
      file: '',
      fileStatus: { 
        selectedFile: null, 
        loaded: 0, 
      },
      participants: {
        name: '',
        role: ''
      }
    };
    this.state.tracks.push(newTrack);
    this.setState({ tracks: this.state.tracks })
  };

  componentDidUpdate(){
  }

  render() {
    if(!this.props.getAlbumDetail) return <Fragment></Fragment>;
    const children = [];

    for (let i = 1; i < this.props.numberOfTracks+1; i += 1) {
      children.push(<Track key={i} index={i} onChange={this.onChange} state={this.state} />);
    }

    return (
      <Form className={'under_div'} onSubmit={e => this.onSubmit(e) }>
        <div className={'under_field tracks'}>
          { children }
          <div className="under_button_area">
            <strong onClick={ this.addTrack } >+</strong>
          </div>
        </div>
        <div className={'under_field'}>
          { this.renderDescription() }
        </div>
        <div className={'under_button_area'}>
          <Button className="ui large button" >UPLOAD</Button>
        </div>
      </Form>
    );
  }

  onChange = {
    onTitleChange(event, index){
      const copy = _.identity(this.state.tracks);
      copy[index-1].title = event.target.value;
      this.setState({tracks: copy});
    },
    onArtistChange(event, index){
      const copy = _.identity(this.state.tracks);
      copy[index-1].artist = event.target.value;
      this.setState({tracks: copy});
    },
    onFileInputChange(event, index) {
      const copy = _.identity(this.state.tracks);
      const fullName = event.target.value;
      copy[index-1].fileStatus.selectedFile = event.target.files[0];
      copy[index-1].fileStatus.loaded = 0;
      copy[index-1].file = fullName.substring(fullName.indexOf('\\', 3)+1, fullName.length);
      this.setState({tracks: copy});

      const data = new FormData()
      data.append('file', this.state.tracks[index-1].fileStatus.selectedFile, this.state.tracks[index-1].fileStatus.selectedFile.name);
      axios
        .post('/api/files/upload', data, {
          onUploadProgress: ProgressEvent => {
            const copy = _.identity(this.state.tracks);
            copy[index-1].fileStatus.loaded = (ProgressEvent.loaded / ProgressEvent.total*100);
            this.setState({
              tracks: copy,
            })
          },
        })
        .then(res => {
          console.log(res.statusText)
        })
    },
    async onGenresChange(index){
      const copy = _.identity(this.state.tracks);
      await this.setState({tracks: copy});
      this.getChildNodes(index)
        .then(test => {
          copy[index-1].genres  = test.map(element => {
            return element.text;
          });
          this.setState({tracks: copy});
        });
    },
    onParticipantsNameChange(event, index){
      const copy = _.identity(this.state.tracks);
      copy[index-1].participants = {
        name: event.target.value,
        role: this.state.tracks[index-1].participants.role
      };
      this.setState({tracks: copy});
    },
    onParticipantsRoleChange(event, index){
      if(!event.target.querySelector('.text')) {
        alert('Error: an error occurred, Please choose again..');
        return;
      }
      const copy = _.identity(this.state.tracks);
      copy[index-1].participants = {
        name: this.state.tracks[index-1].participants.name,
        role: event.target.querySelector('.text').innerHTML
      };
      this.setState({tracks: copy});
    }
  };
  async getChildNodes(index) {
    return await Array.prototype.slice.call(document.querySelectorAll(`#genreSelector${index} a.ui.label`));
  }


  renderDescription = () => {
    return(
      <Fragment>
        <h2>Album Description</h2>
          <div className={'description'}>
            <textarea
              className={'text_area'}
              onChange={e => this.props.setAlbumDescription(e.target.value)}
              value={this.props.getAlbumDescription}
            />
          </div>
      </Fragment>
    )
  };
}

const mapStateToProps = state => {
  return {
    numberOfTracks: state.numberOfTracks,
    getAlbum: state.getAlbum,
    titleSong: state.titleSong,
    getAlbumDescription: state.getAlbumDescription,
    getAlbumDetail: state.getAlbumDetail,
  }
};

export default connect(
  mapStateToProps,
  { addTrackInAlbum, setAlbum, setAlbumDescription }
)(UploadAlbumUnder);