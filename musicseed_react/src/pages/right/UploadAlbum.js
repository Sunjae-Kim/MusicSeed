import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {Form, Select} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../styles/UploadAlbum.css';

const options = [
  { key: 'o1', text: 'Option 1', value: 'option1' },
  { key: 'o2', text: 'Option 2', value: 'option2' },
];

class UploadAlbum extends Component {

  renderAlbumForm(){
    return(
      <Form onSubmit={e => onAlbumSubmit(e) }>
        <h1>Upload Album</h1>
        <Form.Field>
          <input placeholder="Album Title" />
        </Form.Field>
        <Form.Field>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile"/>
            <label className="custom-file-label" htmlFor="customFile">&nbsp;&nbsp;Artwork</label>
          </div>
        </Form.Field>
        <Form.Field>
          <Form.Field control={Select} options={options} placeholder='Rewards' />
        </Form.Field>
        <button className="ui button" type="submit">Add Track</button>
      </Form>
    )
  }

  renderTack(){
    return(
      <div className={'tracks_div'}>

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
}

const onAlbumSubmit = (event) => {
  event.preventDefault();
};

const mapStateToProps = state => {
  return {
    checkedEmail: state.checkedEmail,
    checkedPassword: state.checkedPassword,
    confirmedPassword: state.confirmedPassword,
  }
};

export default connect(
  mapStateToProps
)(UploadAlbum);