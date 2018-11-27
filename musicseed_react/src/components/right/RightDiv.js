import React from "react";
import "../../styles/RightDiv.css";
import {SidePlayer, Login, Register, UploadAlbum} from '../../pages';
import { Route, Switch } from 'react-router-dom';
import SwitchButton from "./SwitchButton";
import {MypageRight} from "../../pages/Mypage";
import AlbumDetailRight from "../../pages/AlbumDetail/AlbumDetailRight";

class RightDiv extends React.Component {
  render() {
    return (
      <div className={'rightsidediv'}>
        <Switch>
          <Route exact path={'/'} component={SidePlayer}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/register'} component={Register}/>
          <Route path={'/uploadAlbum'} component={UploadAlbum}/>
          <Route path={'/mypage'} component={MypageRight}/>
          <Route path={'/albumDetail'} component={AlbumDetailRight}/>
        </Switch>
        <SwitchButton/>
      </div>
    )
  }
}

export default RightDiv;