import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../styles/MypageRight.css';


class MypageRight extends Component {
  render() {
    return (
        <div className="mypage_right">
          <h1>Who am I?</h1>
          <p>
            The first Vision was created by the writer-artist team of Joe Simon and Jack Kirby in Marvel Mystery Comics #13 (Nov. 1940). A mystical, extra-dimensional police officer, The Vision was published by Marvel predecessor Timely Comics during the 1930s and 1940s, a period which fans and historians call the Golden Age of Comic Books.

            Decades later, editor Stan Lee and writer Roy Thomas decided to add a new team member to the superhero-team series The Avengers. Thomas wanted to bring back the Golden Age Vision, but Lee was set on introducing an android member. Thomas ultimately compromised by using a new, android Vision.[1] The second Vision first appeared in The Avengers #57 (Oct. 1968). Thomas wanted the character to be white as befitting his ghostly name, but printing limitations of the time would have rendered him colorless, with un-inked paper where his skin should be. He settled on red as he did not want Vision to be green like the Hulk or blue like the Atlanteans.[2] The character has been compared with Spock from Star Trek, but Thomas said that he was barely aware of the TV series at the time.[3] He acknowledged being influenced by the Adam Link character by Otto Binder, one of the first robots treated as a sympathetic character rather than as a mechanical tool.[3]
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