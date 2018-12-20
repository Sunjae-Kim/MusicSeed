import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { changePlayerState, setPath } from "../../actions/index";
import {connect} from 'react-redux';
import '../../styles/SwitchButton.css';

class SwitchButton extends Component {
  button;

  setButton(){
    switch (this.props.playerState) {
      case true:
        this.button = 'playlist'; break;
      case false:
        this.button = 'search'; break;
      default:
        this.props.changePlayerState(true); return;
    }
  }

  renderSwitchButton(){
    this.setButton();
    return(
      <div className={'switch_button'}>
        <button
          onClick={() => this.props.changePlayerState(!this.props.playerState)}
        >
          <img src="images/mediabuttons/switch.png" alt="switch button"/> <span>&nbsp; {this.button} </span>
        </button>
      </div>
    )
  }

  renderToPlayerButton(){
    return(
      <div
        className={'switch_button'}
      >
        <Link
          to="/"
          onClick={ () => this.props.setPath('player') }
        >
          <img src="images/mediabuttons/switch.png" alt="switch button"/> <span>&nbsp; player </span>
        </Link>
      </div>
    )
  }

  render() {
    const path = this.props.path || 'player';
    switch (path) {
      case 'player':
        return (this.renderSwitchButton());
      default:
        return(this.renderToPlayerButton());
    }
  }
}

const mapStateToProps = state => {
  return {
    playerState: state.playerState,
    path: state.getPath,
  }
};

export default connect(
  mapStateToProps,
  {changePlayerState, setPath}
)(SwitchButton);