import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx'
function Navbar(){

  return (<nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
</nav>)
}

let appData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}

//Helper function to generate Random keys


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {messages: appData.messages,username: appData.currentUser.name}
    this.getMessageFromTextBox = this.getMessageFromTextBox.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessagetoServer = this.sendMessagetoServer.bind(this);
  }
   getMessageFromTextBox(messageString,username){
    
    const newMessage = {id: this.state.messages.length+1, username:username, content: messageString};
    const newMessages = this.state.messages.concat(newMessage);
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: newMessages})

  }

  changeUsername(username){
    this.setState ({username:username});
  }

  sendMessagetoServer(messageObject){
    this.socket.send(JSON.stringify(messageObject));

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket =  new WebSocket("ws://0.0.0.0:3001");
   
    }
    
  
  
  render() {
    console.log("Rendering App");
    return (
      <div>
      <Navbar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar sendMessagetoServer = {this.sendMessagetoServer} changeUsername = {this.changeUsername} username = {this.state.username} getMessageFromTextBox = {this.getMessageFromTextBox}/>
      </div>

    );
  }
}
export default App;
