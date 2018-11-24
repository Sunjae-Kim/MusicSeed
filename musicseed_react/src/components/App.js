import React from "react";
import '../styles/App.css';

import Navigation from "../components/Navigation";
import LP from "../components/LP";
import SideBar from "../components/SideBar";
import BarPlayer from "../components/BarPlayer";
import Logo from "../components/Logo";
import RightSideDiv from "./RightSideDiv";
import LPDiv from "../pages/left/LPPlayer";

class App extends React.Component {
  render() {
    return(
      <div className="pusher">
        <Logo />
        <LP />
        <Navigation />
        <LPDiv/>
        <SideBar />
        <RightSideDiv/>
        <BarPlayer/>
      </div>
    )
  }
}

export default App;