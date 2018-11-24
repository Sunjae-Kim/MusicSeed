import React, {Fragment} from "react";
import { connect } from "react-redux";
import '../styles/App.css';

import Navigation from "../components/Navigation";
import LP from "../components/LP";
import SideBar from "../components/SideBar";
import BarPlayer from "../components/BarPlayer";
import Logo from "../components/Logo";
import { LeftDiv, RightDiv } from "../pages/";

class App extends React.Component {

  renderFixedForm(){
    return(
      <Fragment>
        <Logo />
        <LP />
        <Navigation />
        <LeftDiv/>
        <SideBar />
        <RightDiv/>
      </Fragment>
    );
  }

  render() {
    return(
      <div className="pusher">
        { this.renderFixedForm() }
        <BarPlayer/>
      </div>
    )
  }
}
export default App;