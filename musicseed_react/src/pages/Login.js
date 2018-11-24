import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPath } from "../actions";
import '../styles/Login.css';

class Login extends Component {
  render() {
    return (
      <form className="login ui form" onSubmit={e => onFormSubmit(e) }>
        <div className="field">
          <h1>Login</h1>
          <input type="text" name="first-name" placeholder="Email"/>
        </div>
        <div className="field">
          <input type="text" name="last-name" placeholder="Password"/>
        </div>
        <button className="ui button" type="submit">LOGIN</button>
        <hr/>
        <p>Music Seed 회원이 아닌가요? <strong><Link to={'/register'} className={'a'} onClick={ () => this.props.setPath('register')} >지금 가입하세요.</Link></strong></p>
      </form>
    );
  }
}

const onFormSubmit = (event) => {
  event.preventDefault();
};

const mapStateToProps = state => {
  return {
  }
};

export default connect(
  mapStateToProps,
  {setPath}
)(Login);