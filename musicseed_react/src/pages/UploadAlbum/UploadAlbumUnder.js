import React, {Component, Fragment} from 'react';
import {Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {addTrackInAlbum} from "../../actions/index";

import '../../styles/UnderDiv.css';
import Track from "../../components/under/Track";

class UploadAlbumUnder extends Component {

  onSubmit = (event) => {
    event.preventDefault();
  };

  addTrack = () => {
    this.props.addTrackInAlbum(this.props.numberOfTracks+1);
  };

  render() {
    const children = [];

    for (let i = 1; i < this.props.numberOfTracks+1; i += 1) {
      children.push(<Track key={i} index={i} />);
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

  renderDescription = () => {
    return(
      <Fragment>
        <h2>Album Description</h2>
          <div className={'description'}>
            <Form.TextArea className={'text_area'}/>
          </div>
      </Fragment>
    )
  };
}

const mapStateToProps = state => {
  return {
    numberOfTracks: state.numberOfTracks,
  }
};

export default connect(
  mapStateToProps,
  { addTrackInAlbum }
)(UploadAlbumUnder);