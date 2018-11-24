import React from 'react';
import {connect} from 'react-redux';
import {selectMenu} from '../actions';
import {Link} from 'react-router-dom';
import '../styles/Navigation.css';

class Navigation extends React.Component {

  getChildNodes() {
    const siblings = Array.prototype.slice.call(document.querySelector('.navigation').parentNode.children);
    const [{childNodes}] = siblings;
    return childNodes;
  }

  componentDidMount() {
    this.getChildNodes().forEach(menu => {
      menu.addEventListener('click', () => this.props.selectMenu(menu));
    })
  }

  componentDidUpdate() {
    this.props.selectedMenu.classList.add('active');
    this.getChildNodes().forEach(item => {
      if (item !== this.props.selectedMenu) item.classList.remove('active');
    })
  }

  renderContent() {
    return (
      <div className="navigation ui large secondary pointing menu">
        <Link to={'/'} className="item active">
          Player
        </Link>
        <a href="#" className="item">
          Music
        </a>
        <a href="#" className="item">
          Help
        </a>
        <Link to={'/login'} className="item">
          Login
        </Link>
        <Link to="/register" className="item">
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
    selectedMenu: state.selectedMenu
  }
};

export default connect(
  mapStateToProps,
  {selectMenu}
)(Navigation);