import React, {Component, Fragment} from 'react';

class AlbumDescription extends Component {
  render() {
    return (
      <Fragment>
        { this.renderAlbumDescription() }
      </Fragment>
    );
  }

  renderAlbumDescription(){
    return(
      <div className={'under_field'}>
        <h2>Album Description</h2>
        <p>
          { this.props.description }
        </p>
      </div>
    )
  }
}

export default AlbumDescription;