import React, {Component} from 'react';

class Register extends Component {
  render() {
    return (
      <form className="ui form" onSubmit={e => onFormSubmit(e) }>
        <div className="field">
          <h1>Register</h1>
          <input type="text" name="first-name" placeholder="Email"/>
        </div>
        <div className="field">
          <input type="password" name="last-name" placeholder="Password"/>
        </div>
        <div className="field">
          <input type="password" name="last-name" placeholder="Password Confirm"/>
        </div>
        <div className="field">
          <input type="text" name="last-name" placeholder="Name"/>
        </div>
        <div className="field">
          <input type="text" name="last-name" placeholder="Nick Name"/>
        </div>
        <button className="ui button" type="submit">REGISTER</button>
      </form>
    );
  }
}

const onFormSubmit = (event) => {
  event.preventDefault();
};

export default Register;