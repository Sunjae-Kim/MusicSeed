import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {Form, Select} from 'semantic-ui-react';
import '../../styles/UploadAlbum.css';
import _ from 'underscore';
import {setAlbumDetail} from '../../actions'

const options = [
  { key: 'o1', text: 'Option 1', value: 'option1' },
  { key: 'o2', text: 'Option 2', value: 'option2' },
];

class UploadAlbum extends Component {

  constructor(props) {
    super(props);
    this.state = {
      albumDetail: {
        title: '',
        artwork: '',
        rewards: '',
      }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onArtworkChange = this.onArtworkChange.bind(this);
    this.onRewardsChange = this.onRewardsChange.bind(this);
  }

  onTitleChange(e){
    const detail = _.identity(this.state.albumDetail);
    detail.title = e.target.value;
    this.setState({ albumDetail: detail })
  }

  onArtworkChange(e){
    const detail = _.identity(this.state.albumDetail);
    const fullName = e.target.value;
    detail.artwork = fullName.substring(fullName.indexOf('\\', 3)+1, fullName.length);
    this.setState({ albumDetail: detail })
  }

  onRewardsChange(e){
    if(!e.target.querySelector('.text')) {
      alert('Error: an error occurred, Please choose again..');
      return;
    }
    const detail = _.identity(this.state.albumDetail);
    detail.rewards = e.target.querySelector('.text').innerHTML;
    this.setState({ albumDetail: detail })
  }

  renderAlbumForm(){
    return(
      <div className={'upload_album'}>
        <Form onSubmit={this.onAlbumSubmit}>
          <h1>Upload Album</h1>
          <Form.Field>
            <input
              placeholder="Album Title"
              onChange={this.onTitleChange}
              value={this.state.albumDetail.title}
            />
          </Form.Field>
          <Form.Field>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="customFile" onChange={this.onArtworkChange}/>
              <label className="custom-file-label" htmlFor="customFile">
                { this.state.albumDetail.artwork || 'Click to choose the Artwork' }
              </label>
            </div>
          </Form.Field>
          <Form.Field>
            <Form.Field
              control={Select}
              options={options}
              placeholder='Rewards'
              onChange={this.onRewardsChange}
            />
          </Form.Field>
          <button className="ui button" type="submit">Add Track</button>
        </Form>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        { this.renderAlbumForm() }
      </Fragment>
    );
  }

  onAlbumSubmit = async (event) => {
    event.preventDefault();
    await this.props.setAlbumDetail(this.state.albumDetail);
  };
}


export default connect(
  null,
  {setAlbumDetail}
)(UploadAlbum);