import React from "react";
import "../styles/RightSideDiv.css";
import {Player, Login, Register} from "../pages";
import { Route, Switch } from 'react-router-dom';

class RightSideDiv extends React.Component {
  render() {
    return (
      <div className={'playerrightsidediv'}>
        <Switch>
          <Route exact path={'/'} component={Player}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/register'} component={Register}/>
        </Switch>
      </div>
    )
  }
}

export default RightSideDiv;