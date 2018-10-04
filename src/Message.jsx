import React, {Component} from 'react';



//Helper function to check if given URL contains an image extension
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

//Component responsible for rendering the invidiual sent message
export default class Message extends Component {
  //Render the message component
  render(){
    console.log("Rendering Message");
    //Check the type of message[Message or notification] being rendered, and return appropriate JSX 
    if(this.props.type==="incomingMessage"){
      //IF the message contains an image, return the appropriate JSX
      if(isItAnImageURL(this.props.content)){
        return (
          <div className="message">
            <span className="message-username" style={{color:this.props.userColor}}>{this.props.username}</span>
            <div className="message-content img-span" style={{borderColor:this.props.userColor}}> <img src={this.props.content}/> </div>
          </div>
        );
      } else {
        return (
          <div className="message">
            <span className="message-username" style={{color:this.props.userColor}}>{this.props.username}</span>
            <span className="message-content" style={{borderColor:this.props.userColor}}>{this.props.content}</span>
          </div>
        );
      }
    }
    
    else if(this.props.type==="incomingNotification"){
      return  <div className="message system">
                <div className="notification">
                  <span className="notification-content" style={{color:this.props.userColor}}><i className="fas fa-exclamation-triangle"style={{padding:"5px"}}></i>{this.props.content}</span>
                </div>
              </div>;
    }
    else {
      console.log("Error: Invalid Message type");
      return null;
    }
    
  }
}
