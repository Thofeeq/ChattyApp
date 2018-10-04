import React, {Component} from 'react';

//This component is responsible to render the navbar and displaying online users
export default class Navbar extends Component {
  render(){
    return (<nav className="navbar">
    <div>
      <a href="/" className="navbar-brand">Web Talky</a>
      <img id="logo" src="./images/logoWebTalky.png" alt=""/>
    </div>
    <span> {this.props.currentUserTotal} Online</span>
  </nav>);
  } 
}
