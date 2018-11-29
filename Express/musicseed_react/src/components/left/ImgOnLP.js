import React, {Component, Fragment} from 'react';
import '../../styles/OnLP.css';

class ImgOnLp extends Component {
  render() {
    return (
      <Fragment>
        <img className="ui medium circular image on_lp" alt="artwork" src={this.props.image} />
      </Fragment>
    );
  }
}

export default ImgOnLp;