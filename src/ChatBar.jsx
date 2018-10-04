import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props){
    super(props);
  
  }
  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      
      this.props.sendMessagetoServer({content:event.target.value,username:this.props.username,type:"postMessage"});
     event.target.value = "";
    }
  }

  usernameChange =(event) => {
    if(event.target.value === "")
    {
      this.props.changeUsername("Anonymous");
    }
    else{
      this.props.sendNotificationToServer({"type": "postNotification", "content":  `${this.props.username} has changed their name to ${event.target.value}`});
      this.props.changeUsername(event.target.value);
  }
}

  render(){
    console.log("Rendering ChatBar");
    return (<footer className="chatbar">
    <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={this.usernameChange}/>
    <input  onKeyPress={this.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>);
  }
}

