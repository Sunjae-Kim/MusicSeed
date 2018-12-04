import React, {Fragment} from "react";
import { connect } from "react-redux";
import { setPath } from "../../actions/index";
import { Link,  } from "react-router-dom";
import "../../styles/Navigation.css";
import _ from "underscore";

class Navigation extends React.Component {
  renderLogin() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case undefined:
      case null:
      case false:
        return (
          <Fragment>
            <Link
              id={"login"}
              to={"/login"}
              className="item"
              onClick={() => this.props.setPath("login")}
            >
              Login
            </Link>
            <Link
              id={"register"}
              to={"/register"}
              className="item"
              onClick={() => this.props.setPath("register")}
            >
              Register
            </Link>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <a href="/auth/logout" className="item">
              Logout
            </a>
            <Link
              id={"mypage"}
              to={"/mypage"}
              className="item"
              onClick={() => this.props.setPath("mypage")}
            >
              My Page
            </Link>
            <a className="item">
            {`${this.props.auth.name}님의 Seed : ${this.props.auth.seed}`}
            </a>
          </Fragment>
        );
    }
  }

  getChildNodes() {
    const siblings = Array.prototype.slice.call(
      document.querySelector(".navigation").parentNode.children
    );
    const [{ childNodes }] = siblings;
    return childNodes;
  }

  navMenus = ["player", "uploadAlbum", "help", "login", "mypage", "register"];

  componentDidMount() {
    const pathName = window.location.pathname.substring(1);
    const path = _.contains(pathName, "/")
      ? pathName.substring(0, pathName.indexOf("/", 2))
      : pathName || "player";
    this.props.setPath(path);
  }

  componentDidUpdate() {
    const path = this.props.getPath;
    try {
      if (_.contains(this.navMenus, path)) {
        document
          .querySelector(`#${this.props.getPath}`)
          .classList.add("active");
        this.getChildNodes().forEach(item => {
          if (item.id !== path) item.classList.remove("active");
        });
      } else {
        document.querySelector(`#player`).classList.add("active");
        this.getChildNodes().forEach(item => {
          if (item.id !== "player") item.classList.remove("active");
        });
      }
    } catch (e) {}
  }

  renderContent() {
    return (
      <div className="navigation ui large secondary pointing menu">
        <Link
          id={"player"}
          to={"/"}
          className="item"
          onClick={() => this.props.setPath("player")}
        >
          Player
        </Link>
        <Link
          id={"uploadAlbum"}
          to={"/uploadAlbum"}
          className="item"
          onClick={() => this.props.setPath("uploadAlbum")}
        >
          Upload Album
        </Link>
        {this.renderLogin()}
      </div>
    );
  }

  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    getPath: state.getPath,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { setPath }
)(Navigation);
