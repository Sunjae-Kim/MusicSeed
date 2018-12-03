import React from "react";
import '../styles/App.css';
import { connect } from 'react-redux';
import * as actions from '../actions'

import Navigation from "./fixed/Navigation";
import LP from "./left/LP";
import SideBar from "./fixed/SideBar";
import BarPlayer from "./fixed/BarPlayer";
import Logo from "./fixed/Logo";
import {LeftDiv, RightDiv} from "../pages/";
import UploadAlbumUnder from "../pages/UploadAlbum/UploadAlbumUnder";
import {Route, Switch} from "react-router-dom";
import MypageUnder from "../pages/Mypage/MypageUnder";
import AlbumDetailUnder from "../pages/AlbumDetail/AlbumDetailUnder";

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

  render() {
    return(
      <div className="pusher">
        <div className={'main_page'}>
          <Logo />
          <LP />
          <LeftDiv/>
          <SideBar />
          <RightDiv/>
          <Navigation />
        </div>
        <Switch>
          <Route exact path={'/uploadAlbum'} component={UploadAlbumUnder}/>
          <Route path={'/mypage'} component={MypageUnder}/>
          <Route path={'/albumDetail'} component={AlbumDetailUnder}/>
        </Switch>
        <BarPlayer/>
      </div>
    )
  }
}
export default connect(null, actions)(App);