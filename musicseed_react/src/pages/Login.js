import React, {Component} from 'react';

class Login extends Component {
  render() {
    return (
      <form className="ui form" onSubmit={e => onFormSubmit(e) }>
        <div className="field">
          <h1>Login</h1>
          <input type="text" name="first-name" placeholder="Email"/>
        </div>
        <div className="field">
          <input type="text" name="last-name" placeholder="Password"/>
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    );
  }
}

const onFormSubmit = (event) => {
  event.preventDefault();
};

export default Login;