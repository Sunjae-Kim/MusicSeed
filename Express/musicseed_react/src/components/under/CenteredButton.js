import React, {Component} from 'react';
import {Button} from "semantic-ui-react";

class CenteredButton extends Component {
  render() {
    return (
      <div className={'under_button_area'}>
        <Button href={'#'} className="ui large button" >
          {this.props.buttonText}
        </Button>
      </div>
    );
  }
}

export default CenteredButton;