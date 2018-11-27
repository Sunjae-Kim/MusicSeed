import React, {Fragment} from "react";
import { connect } from "react-redux";
import '../styles/App.css';

import Navigation from "../components/Navigation";
import LP from "../components/LP";
import SideBar from "../components/SideBar";
import BarPlayer from "../components/BarPlayer";
import Logo from "../components/Logo";
import { LeftDiv, RightDiv } from "../pages/";
import SwitchButton from "./SwitchButton";
import UnderDiv from "../pages/under/UnderDiv";

class App extends React.Component {

  render() {
    return(
      <div className="pusher">
        <div className={'main_page'}>
          <Logo />
          <LP />
          <LeftDiv/>
          <SideBar />
          <RightDiv/>
          <BarPlayer/>
          <Navigation />
        </div>
        <UnderDiv/>
      </div>
    )
  }
}
export default App;