import React, {Component, Fragment} from 'react';
import {Icon, Menu, Table} from "semantic-ui-react";
import faker from 'faker';

class Receipts extends Component {
  render() {
    return (
      <Fragment>
        { this.renderReceiptsList() }
      </Fragment>
    );
  }

  renderReceiptsList(){
    return(
      <div className={'under_field'}>
        <h1>Receipts</h1>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>September 14, 2018</Table.Cell>
              <Table.Cell>{faker.name.firstName()}</Table.Cell>
              <Table.Cell>{faker.name.firstName()}</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>play</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>January 11, 2018</Table.Cell>
              <Table.Cell>{faker.name.firstName()}</Table.Cell>
              <Table.Cell>{faker.name.firstName()}</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>play</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>May 11, 2018</Table.Cell>
              <Table.Cell>{faker.name.firstName()}</Table.Cell>
              <Table.Cell>{faker.name.firstName()}</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>play</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }
}

export default Receipts;