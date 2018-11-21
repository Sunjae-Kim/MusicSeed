import React from 'react'
import { Item, Container } from 'semantic-ui-react'

const ItemExampleContents = () => (
  <Container>
    <Item.Group divided>
      <Item>
        <Item.Image size='tiny' src='/images/wireframe/image.png' />
        <Item.Content verticalAlign='middle'>Content A</Item.Content>
      </Item>

      <Item>
        <Item.Image size='tiny' src='/images/wireframe/image.png' />
        <Item.Content verticalAlign='middle'>Content B</Item.Content>
      </Item>

      <Item>
        <Item.Image size='tiny' src='/images/wireframe/image.png' />
        <Item.Content content='Content C' verticalAlign='middle' />
      </Item>
    </Item.Group>
  </Container>
)

export default ItemExampleContents
