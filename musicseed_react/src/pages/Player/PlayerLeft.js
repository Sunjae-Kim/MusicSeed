import React, {Fragment} from "react";
import {connect} from 'react-redux';
import '../../styles/PlayerLeft.css';
import {setPath} from "../../actions";
import ImgOnLp from "../../components/left/ImgOnLP";
import TextOnLp from "../../components/left/TextOnLP";
import faker from "faker";

class LPDiv extends React.Component {
  render() {
    if (!this.props.playedSong) {
      return (
        <div className={'on_lp'}>
        </div>
      )
    } else {
      return (
        <Fragment>
          <TextOnLp
            first={ faker.lorem.words() }
            firstLink={'albumDetail'}
            second={ faker.name.firstName() }
            secondLink={'mypage'}
          />
          <ImgOnLp image={'images/album1.jpg'}/>
        </Fragment>
      )
    }
  }
}


const mapStateToProps = state => {
  return {
    playedSong: state.playedSong
  }
};

export default connect(
  mapStateToProps,
  {setPath}
)(LPDiv);