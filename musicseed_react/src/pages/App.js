import React from "react";
import '../styles/App.css';

import Navigation from "../components/Navigation";
import LP from "../components/LP";
import SideBar from "../components/SideBar";
import BarPlayer from "../components/BarPlayer";
import Logo from "../components/Logo";


class App extends React.Component {
  render() {
    return(
      <div className="pusher">
        <Logo />
        <Navigation />
        <SideBar />
        <LP />
        <BarPlayer/>
      </div>
    )
  }
}

export default App;