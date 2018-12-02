import React from 'react';
import {connect} from 'react-redux';
import {setPath} from '../../actions/index';
import {Link} from 'react-router-dom';
import '../../styles/Navigation.css';

class Navigation extends React.Component {

    renderLogin() {
        console.log("asdfasdf");
        console.log(this.props.auth);
        switch(this.props.auth) {
            case null:
                return <Link id={'login'} to={'/login'} className="item" onClick={() => this.props.setPath('login')}>
                    Login
                </Link>;
            default:
                return <a href="/api/users/logout">Logout</a>
        }
    }

  getChildNodes() {
    const siblings = Array.prototype.slice.call(document.querySelector('.navigation').parentNode.children);
    const [{childNodes}] = siblings;
    return childNodes;
  }

  componentDidMount() {
    const path = window.location.pathname.substring(1) || 'player';
    switch (path) {
      case 'albumDetail':
        document.querySelector(`#player`).classList.add('active');
        this.props.setPath(path);
        break;
      default:
        document.querySelector(`#${path}`).classList.add('active');
        this.getChildNodes().forEach(menu => {
          menu.addEventListener('click', async () => await this.props.setPath(menu.id));
        });
    }
  }

  componentDidUpdate() {
    switch (this.props.getPath) {
      case 'albumDetail':
        document.querySelector(`#player`).classList.add('active'); break;
      default:
        document.querySelector(`#${this.props.getPath}`).classList.add('active');
          this.getChildNodes().forEach(item => {
              if (item.id !== this.props.getPath) item.classList.remove('active');
          })
    }
  }

  renderContent() {
    return (
      <div className="navigation ui large secondary pointing menu">
        <Link id={'player'} to={'/'} className="item" onClick={() => this.props.setPath('player')}>
          Player
        </Link>
        <Link id={'uploadAlbum'} to={'/uploadAlbum'} className="item" onClick={() => this.props.setPath('uploadAlbum')}>
          Upload Album
        </Link>
        <a id={'help'} href="#" className="item">
          Help
        </a>
        {/*<Link id={'login'} to={'/login'} className="item" onClick={() => this.props.setPath('login')}>*/}
          {/*Login*/}
        {/*</Link>*/}
          { this.renderLogin() }
        <Link id={'register'} to={"/register"} className="item" onClick={() => this.props.setPath('register')}>
          Register
        </Link>
        <Link id={'mypage'} to={"/mypage"} className="item" onClick={() => this.props.setPath('mypage')}>
          My Page
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
    getPath: state.getPath,
    auth: state.auth,
  }
};

export default connect(
  mapStateToProps,
  {setPath}
)(Navigation);