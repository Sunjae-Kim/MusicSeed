import React, {Fragment} from "react";
import { connect } from 'react-redux';
import faker from 'faker';
import '../../styles/PlayerLeft.css';
import ImgOnLp from "../../components/left/ImgOnLP";
import TextOnLp from "../../components/left/TextOnLP";

class MypageLeft extends React.Component {
  render() {
    return (
      <Fragment>
        <TextOnLp
          first={ faker.name.firstName() }
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
  mapStateToProps
)(MypageLeft);