import React from "react";
import {Route, Switch} from 'react-router-dom';
import {LPPlayer} from "../";

class LeftDiv extends React.Component {
  render() {
    return (
      <div className={'lpdiv'}>
        <Switch>
          <Route exact path={'/'} component={LPPlayer}/>
          {/*<Route path={'/login'} component={}/>*/}
          {/*<Route path={'/register'} component={}/>*/}
        </Switch>
      </div>
    )
  }
}

export default LeftDiv;