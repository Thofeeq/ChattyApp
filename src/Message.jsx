import React, {Component} from 'react';


// function Message({username,content}){
//   return (
//     <div className="message">
//       <span className="message-username">{this.props.username}</span>
//       <span className="message-content">{this.props.content}</span>
//     </div>

//   );
// }

function isItAnImageURL(url){
  let isValid = false;
  let extensionIndex = 0;
  let extension = "";
  let validExtension = [".jpg",".png",".gif"];
  extensionIndex = url.lastIndexOf('.');
  extension = url.slice(extensionIndex);
 
  if(validExtension.indexOf(extension) >= 0){
    isValid = true;
  }
  return isValid;
}

export default class Message extends Component {

  render(){
    console.log("Rendering Message");
    if(this.props.type==="incomingMessage"){
      if(isItAnImageURL(this.props.content)){
        return (
          <div className="message">
            <span className="message-username" style={{color:this.props.userColor}}>{this.props.username}</span>
            <span  className="message-content" > <img src={this.props.content}/> </span>
          </div>
        );
      } else {
        return (
          <div className="message">
            <span className="message-username" style={{color:this.props.userColor}}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
      }

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
