import React from "react";
import ReactDOM from "react-dom";
import { Container } from 'semantic-ui-react'
import Navigation from "./components/Navigation";
import Player_grid from "./components/Player_grid";
import './styles/index.css';

class App extends React.Component {

  state = {

  };

  renderContent(){
    return (
      <div className="container">
        <Navigation test={''} />
        <Player_grid />
      </div>
    )
  }

  render() {
    return(
      <div className="pusher">
        { this.renderContent() }
      </div>
    )
  }


  componentDidMount(){

  }

  componentDidUpdate(){

  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
