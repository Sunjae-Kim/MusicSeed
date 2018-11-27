import React from "react";
import { connect } from 'react-redux';
import '../../styles/LPPlayer.css';

class MypageLeft extends React.Component {
  render() {
    return (
      <div className={'lpplayer'}>
        <h1> Artist Name </h1>
        <h2> Singer </h2>
        <img className="ui medium circular image" src="images/album1.jpg" />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
  }
};

export default connect(
  mapStateToProps
)(MypageLeft);