import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../styles/MypageRight.css';
import {lorem} from 'faker';

class MypageRight extends Component {
  render() {
    return (
        <div className="mypage_right">
          <h1>Who am I?</h1>
          <p>
            { lorem.paragraphs() }
          </p>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

export default connect(
  mapStateToProps,
)(MypageRight);