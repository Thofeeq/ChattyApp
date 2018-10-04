import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'
function Navbar(props){
  console.dir(props);

  return (<nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
  <span> {props.currentUserTotal} Online</span>
</nav>)
}

let appData = {
  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}


class App extends Component {
  
  constructor(props){ //Question for mentor(Why pass in props? Why call super? Why bind? )
    super(props);
    this.state = {messages: appData.messages,username: appData.currentUser.name, currentUserTotal: 0}
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessagetoServer = this.sendMessagetoServer.bind(this);
    this.sendNotificationToServer = this.sendMessagetoServer.bind(this);
    this.messageFromServer = 0;
    this.socket =  new WebSocket("ws://0.0.0.0:3001");
  }
  
  componentDidMount() {

    console.log("componentDidMount <App />");
    //Listening for data
    this.socket.onmessage =  (event)=>{ //QUESTION FOR MENTOR (Why cant i use the regular function expression?)
      console.log("WE recv");
    const incomingData = (JSON.parse(event.data));
    let newMessageState;
    switch(incomingData.type) { //QUESTION - why use switch - it works the same
      case "incomingMessage":
        // handle incoming message
        newMessageState = this.state.messages.concat(incomingData);
        this.setState({messages:newMessageState});
        break;
      case "incomingNotification":
        // handle incoming notification
        newMessageState = this.state.messages.concat(incomingData);
        this.setState({messages:newMessageState});        
        break;
      case "currentUserTotal":
      this.setState({currentUserTotal:incomingData.total});
      break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + newMessageState.type);
    }
    
   
    
      } 
    }
  changeUsername(username){
    this.setState ({username:username});
  }

  sendMessagetoServer(messageObject){
    this.socket.send(JSON.stringify(messageObject));
   
  }

  sendNotificationToServer(notificationObject){
  this.socket.send(JSON.stringify(notificationObject));
  }


  render() {
    console.log("Rendering App");
    return (
      <div>
      <Navbar currentUserTotal = {this.state.currentUserTotal}/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar  sendNotificationToServer = {this.sendNotificationToServer} sendMessagetoServer = {this.sendMessagetoServer} changeUsername = {this.changeUsername} username = {this.state.username} />
      </div>
    );
  }
}
export default App;
