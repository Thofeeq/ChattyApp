import React, {Component} from 'react';

/*Component responsible for rendering the Chat textbox/input and the username textbox/input along with calling methods to send 
 messages/notification to server as needed */

export default class ChatBar extends Component {

  handleEmojiClick = (code,emoji) => {
    
  }

  //Event handler for sending message from the textbot upon pressing 'Enter' key
  sendMessageEvent = (event) => {
    if(event.key == 'Enter'){
      //Once event is fired, call sendMessageToServer method to send the message to the server
      this.props.sendMessagetoServer({content:event.target.value,username:this.props.username,type:"postMessage"});
      //Set the textbox to empty once message has been sent
      event.target.value = "";
    }
  }

  //Event handler for changing the username
  usernameChangeEvent =(event) => {
    if(event.key == 'Enter'){
      if(event.target.value === ""){
        //If no name provided, set username to Anonymous
        this.props.changeUsername("Anonymous");
      }
      else{
        //Send a notification to server to be broadcasted of the username change and change the usename 
        this.props.sendNotificationToServer({"type": "postNotification", "content":  `${this.props.username} has changed their name to ${event.target.value}`});
        this.props.changeUsername(event.target.value);
      }
    }   
  }

  //Renders the ChatBar component
  render(){
    console.log("Rendering ChatBar");
    //Returning the JSX with event handlers attached to the elements
    return (<footer className="chatbar">
    <input  onKeyPress={this.usernameChangeEvent} className="chatbar-username" placeholder="Your Name (Optional)" />
    <input  onKeyPress={this.sendMessageEvent} className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>);
  }
}

