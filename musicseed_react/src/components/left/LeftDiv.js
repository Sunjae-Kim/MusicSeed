import React from "react";
import {Route, Switch} from 'react-router-dom';
import {LPPlayer} from "../../pages/index";
import {MypageLeft} from "../../pages/Mypage/index";
import AlbumDetailLeft from "../../pages/AlbumDetail/AlbumDetailLeft";



class LeftDiv extends React.Component {
  render() {
    return (
      <div className={'lpdiv'}>
        <Switch>
          <Route exact path={'/'} component={LPPlayer}/>
          <Route path={'/mypage'} component={MypageLeft}/>
          <Route path={'/albumDetail'} component={AlbumDetailLeft}/>
        </Switch>
      </div>
    )
  }
}

export default LeftDiv;