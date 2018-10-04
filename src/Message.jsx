import React, {Component} from 'react';


// function Message({username,content}){
//   return (
//     <div className="message">
//       <span className="message-username">{this.props.username}</span>
//       <span className="message-content">{this.props.content}</span>
//     </div>

//   );
// }
export default class Message extends Component {

  render(){
    console.log("Rendering Message");
    if(this.props.type==="incomingMessage"){
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
    
      );
    }
    else if(this.props.type==="incomingNotification"){
      return   <div className="notification">
      <span className="notification-content">{this.props.content}</span>
    </div>;
    }
    else {
      console.log("INVALID");
      return null;
    }

  }
}
