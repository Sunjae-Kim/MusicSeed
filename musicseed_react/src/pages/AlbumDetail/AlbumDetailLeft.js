import React, {Fragment} from "react";
import {connect} from 'react-redux';
import '../../styles/PlayerLeft.css';
import ImgOnLp from "../../components/left/ImgOnLP";
import TextOnLp from "../../components/left/TextOnLP";
import faker from "faker";

class AlbumDetailLeft extends React.Component {
  render() {
      return (
        <Fragment>
          <TextOnLp
            first={ faker.lorem.words() }
            second={ faker.name.firstName() }
            secondLink={'mypage'}
          />
          <ImgOnLp image={'images/album1.jpg'}/>
        </Fragment>
      )
  }
}


const mapStateToProps = state => {
  return {
  }
};

export default connect(
  mapStateToProps,
)(AlbumDetailLeft);