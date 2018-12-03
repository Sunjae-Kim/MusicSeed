import React, {Fragment} from "react";
import {connect} from 'react-redux';
import '../../styles/PlayerLeft.css';
import ImgOnLp from "../../components/left/ImgOnLP";
import TextOnLp from "../../components/left/TextOnLP";
import faker from "faker";

class AlbumDetailLeft extends React.Component {
  
  render() {
    if(!this.props.getAlbum) window.location.href = '/';
      return (
        <Fragment>
          <TextOnLp
            first={ this.props.getAlbum.album.title || '' }
            second={ this.props.getAlbum.album.user_name || '' }
            secondLink={'mypage'}
          />
          <ImgOnLp image={`artwork/${this.props.getAlbum.musics[0].artwork_path}`}/>
        </Fragment>
      )
  }

  componentDidMount(){
    console.log(this.props.getAlbum);
  }

}



const mapStateToProps = state => {
  return {
    getAlbum: state.getAlbum,
  }
};

export default connect(
  mapStateToProps,
)(AlbumDetailLeft);