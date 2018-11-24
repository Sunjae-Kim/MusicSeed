import React from 'react';
import {connect} from 'react-redux';
import {setPath} from '../actions';
import {Link} from 'react-router-dom';
import '../styles/Navigation.css';

class Navigation extends React.Component {

  getChildNodes() {
    const siblings = Array.prototype.slice.call(document.querySelector('.navigation').parentNode.children);
    const [{childNodes}] = siblings;
    return childNodes;
  }

  componentDidMount() {
    document.querySelector(`#${window.location.pathname.substring(1)}`).classList.add('active');
    this.getChildNodes().forEach(menu => {
      menu.addEventListener('click', async () => await this.props.setPath(menu.id));
    })
  }

  componentDidUpdate() {
    document.querySelector(`#${this.props.getPath}`).classList.add('active');
    this.getChildNodes().forEach(item => {
      if (item.id !== this.props.getPath) item.classList.remove('active');
    })
  }

  renderContent() {
    return (
      <div className="navigation ui large secondary pointing menu">
        <Link id={'player'} to={'/player'} className="item">
          Player
        </Link>
        <a id={'upload'} href="#" className="item">
          Upload Album
        </a>
        <a id={'help'} href="#" className="item">
          Help
        </a>
        <Link id={'login'} to={'/login'} className="item">
          Login
        </Link>
        <Link id={'register'} to={"/register"} className="item">
          Register
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    getPath: state.getPath
  }
};

export default connect(
  mapStateToProps,
  {setPath}
)(Navigation);