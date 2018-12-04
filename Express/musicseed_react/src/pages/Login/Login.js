import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPath, checkEmail, checkPassword } from "../../actions/index";
import '../../styles/Login.css';
import axios from "axios";

class Login extends Component {
    onFormSubmit = async (event) => {
        event.preventDefault();
        let user = {
            email: this.props.checkedEmail,
            pw: this.props.checkedPassword,
        };
        await axios.post('/auth/login', user);
    };

  render() {
    return (
      <form className="login ui form" onSubmit={e => this.onFormSubmit(e) }>
        <div className="field">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={ e => this.props.checkEmail(e.target.value) }
            value={ this.props.checkedEmail }
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            onChange={ e => this.props.checkPassword(e.target.value) }
            value={ this.props.checkedPassword }
          />
        </div>
        <button className="ui button" type="submit">LOGIN</button>
        <hr/>
        <p>Music Seed 회원이 아닌가요? <strong><Link to={'/register'} className={'a'} onClick={ () => this.props.setPath('register')} >	&nbsp; 지금 가입하세요.</Link></strong></p>
          <a href="/auth/google"> 구글로그인 </a>
      </form>
    );
  }
}



const mapStateToProps = state => {
  return {
    checkedEmail: state.checkedEmail,
    checkedPassword: state.checkedPassword,
  }
};

export default connect(
  mapStateToProps,
  {setPath, checkEmail, checkPassword}
)(Login);