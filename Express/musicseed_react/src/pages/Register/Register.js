import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { checkEmail, checkPassword, confirmPassword, checkName, checkNickname } from "../../actions/index";
import axios from "axios";

class Register extends Component {

  confirmPasswordOnChange(){
    if(this.props.checkedPassword === this.props.confirmedPassword) {
        // console.log('OK');
        return true;
    }else{
        return false;
    }
  }

  componentDidUpdate(){
    this.confirmPasswordOnChange();
  }


    onFormSubmit = async (event) => {
        event.preventDefault();
        if(this.confirmPasswordOnChange()){
            let user = {
                email: this.props.checkedEmail,
                pw: this.props.checkedPassword,
                name: this.props.checkedName,
                nickname: this.props.checkedNickname,
            };
            await axios.post('/api/users', user)
                .then(function (response) {
                    if (response.data.redirect == '/login') {
                        window.location = "/login";
                    } else{
                        window.location = '/register';
                    }
                });
        }
    };

  render() {
    return (
      <form className="ui form" onSubmit={e => this.onFormSubmit(e) }>
        <div className="field">
          <h1>Register</h1>
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
        <div className="field">
          <input
            type="password"
            placeholder="Password Confirm"
            onChange={ e => this.props.confirmPassword(e.target.value) }
            value={ this.props.confirmedPassword }
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            onChange={ e => this.props.checkName(e.target.value) }
            value={ this.props.checkedName }
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Nickname"
            onChange={ e => this.props.checkNickname(e.target.value) }
            value={ this.props.checkedNickname }
          />
        </div>
        <button className="ui button" type="submit">REGISTER</button>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {
    checkedEmail: state.checkedEmail,
    checkedPassword: state.checkedPassword,
    confirmedPassword: state.confirmedPassword,
    checkedName: state.checkedName,
    checkedNickname: state.checkedNickname
  }
};

export default connect(
  mapStateToProps,
  { checkEmail, checkPassword, confirmPassword, checkName, checkNickname }
)(Register);