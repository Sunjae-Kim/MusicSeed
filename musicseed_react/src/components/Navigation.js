import React from 'react';
import '../styles/Navigation.css';

class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      actived_item: null
    };
  }

  getChildNodes(){
    const siblings = Array.prototype.slice.call(document.querySelector('.navigation').parentNode.children);
    const [{ childNodes }] = siblings;
    return childNodes;
  }

  componentDidMount(){
    this.getChildNodes().forEach(item => {
      item.addEventListener('click', () => this.setState({ actived_item: item })
      );
    })
  }

  componentDidUpdate(){
    this.state.actived_item.classList.add('active');
    this.getChildNodes().forEach(item => {
      if(item !== this.state.actived_item) item.classList.remove('active');
    })
  }

  renderContent(){
    return (
        <div className="navigation ui large secondary pointing menu">
          <a href="#" className="item active">
            Player
          </a>
          <a href="#" className="item">
            Music
          </a>
          <a href="#" className="item">
            Help
          </a>
          <a href="#" className="item">
            Login
          </a>
          <a href="#" className="item">
            Register
          </a>
        </div>
    )
  }

  render(){
    return(
      <div className="container">
        { this.renderContent() }
      </div>
    )
  }
}

export default Navigation;