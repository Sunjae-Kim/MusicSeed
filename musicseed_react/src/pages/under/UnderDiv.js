import React, {Component, Fragment} from 'react';
import {Form, Button, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {addTrackInAlbum} from "../../actions";

import '../../styles/UnderDiv.css';
import Track from "../../components/Track";

class UnderDiv extends Component {

  state = { open: false, titleSong: '' };
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  onSubmit = (event) => {
    event.preventDefault();
  };

  addTrack = () => {
    this.props.addTrackInAlbum(this.props.numberOfTracks+1);
  };

  render() {
    console.log(this.props.numberOfTracks);
    const children = [];

    for (let i = 0; i < this.props.numberOfTracks; i += 1) {
      children.push(<Track key={i} number={i} />);
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
          <Button className="ui large button" onClick={this.open}>UPLOAD</Button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
        </div>
      </Form>
    );
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

const mapStateToProps = state => {
  return {
    numberOfTracks: state.numberOfTracks,
  }
};

export default connect(
  mapStateToProps,
  { addTrackInAlbum }
)(UnderDiv);