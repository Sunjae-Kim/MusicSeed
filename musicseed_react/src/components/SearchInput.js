import React from 'react';
import {connect} from 'react-redux';
import {searchKeyword} from "../actions";
import "../styles/Input.css";

class SearchInput extends React.Component {

  onInputChange = async keyword => {
    await this.props.searchKeyword(keyword);
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  renderContent() {
    return (
      <div className="ui icon input">
        <input
          type="text"
          id="keyword"
          onChange={e => this.onInputChange(e.target.value)}
          value={this.props.searchedKeyword}
        />
        <i className="search icon"/>
      </div>
    )
  }

  render() {
    return (
      <form className={'searchinput ui form'} onSubmit={e => this.onFormSubmit(e)}>
        {this.renderContent()}
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchedKeyword: state.searchedKeyword
  }
};

export default connect(
  mapStateToProps,
  {searchKeyword}
)(SearchInput);