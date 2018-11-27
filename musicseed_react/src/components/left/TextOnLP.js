import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/OnLP.css';

class TextOnLp extends Component {

  setFirst(){
    if(!this.props.firstLink){
      return (<h1> { this.props.first } </h1>);
    } else {
      return(
        <Link to={this.props.firstLink}>
          <h1> { this.props.first } </h1>
        </Link>
      )
    }
  }

  setSecond(){
    if(!this.props.secondLink){
      return (<h2> { this.props.second } </h2>);
    } else {
      return(
        <Link to={this.props.secondLink}>
          <h2> { this.props.second } </h2>
        </Link>
      )
    }
  }

  render() {
    return (
      <div className={'on_lp'}>
        { this.setFirst() }
        { this.setSecond() }
      </div>
    );
  }
}

export default TextOnLp;