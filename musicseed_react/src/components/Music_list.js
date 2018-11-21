import React, {Component} from 'react';
import {Container, List} from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import {Item} from "semantic-ui-react";

class MusicList extends Component {
  render() {
    return (
        <div className={'music_list ui container'}>
          <Item.Group divided>
            <Item>
              <Item.Content verticalAlign='middle'>Content A</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign='middle'>Content B</Item.Content>
            </Item>

          </Item.Group>
        </div>
    );
  }
}

export default MusicList;