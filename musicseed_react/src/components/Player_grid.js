import React from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react';
import MusicList from "./Music_list";
import LP from "./LP";
import '../styles/Player_grid.css';
import Side_bar from "./Side_bar";

const DividerExampleVertical = () => (
  <div className="player ui grid">
    <Grid.Column floated={'right'} width={10}>
        <LP />
    </Grid.Column>
    <Grid.Column floated={'left'} width={5}>
      <Side_bar />
      <MusicList />
    </Grid.Column>
  </div>
);

export default DividerExampleVertical