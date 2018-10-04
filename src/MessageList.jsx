import React, {Component} from 'react';
import Message from './Message.jsx';

//This component is responsible for handling the rendering of all the messages
export default class MessageList extends Component {

  render(){
    /* Takes the message array from appData object, and maps it to a Message componenet and passes respective value required to create Message Component*/
    const listOfMessages = this.props.messages.map((message)=>  
    <Message key={message.id} userColor = {message.userColor}username = {message.username} content = {message.content} type = {message.type}/>
    );

  return (<main className="messages">
            {listOfMessages}
          </main>);
  }
}