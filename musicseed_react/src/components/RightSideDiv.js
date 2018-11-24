import React from "react";
import "../styles/RightSideDiv.css";
import {Player, Login} from "../pages";
import { Route, Switch } from 'react-router-dom';

class RightSideDiv extends React.Component {
  render() {
    return (
      <div className={'playerrightsidediv'}>
        <Switch>
          <Route exact path={'/'} component={Player}/>
          <Route exact path={'/login'} component={Login}/>
        </Switch>
      </div>
    )
  }
}

export default RightSideDiv;