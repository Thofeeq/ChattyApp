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

//Object that holds all the data for the app
let appData = {
  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}

/*Top level Component, within it contains all the necessary sub-components required to build/render the app as well as the logic of the
 app*/
class App extends Component {
  
  //Setting up the state and binding methods as required
  constructor(){ 
    super();
    //Setting up the state for current sent messages, current user, and number of users online
    this.state = {messages: appData.messages,username: appData.currentUser.name, currentUserTotal: 0}
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessagetoServer = this.sendMessagetoServer.bind(this);
    this.sendNotificationToServer = this.sendMessagetoServer.bind(this); 
    this.messageFromServer = 0;
    //Setting up the socket 
    this.socket =  new WebSocket("ws://0.0.0.0:3001");
  }
  
  //All the updates once the page is loaded goes here
  componentDidMount() {

    console.log("componentDidMount <App />");
    //Listening for data
    this.socket.onmessage =  (event)=>{ 
      //Parsing the incoming data into an Object that we can use/modify  
      const incomingData = (JSON.parse(event.data));
      //Handling the incoming data depending on what type they are (incoming message? incoming notification? or current online users?)
      let newMessageState;
      switch(incomingData.type) {
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
          //handle number of connected users
          this.setState({currentUserTotal:incomingData.total});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + newMessageState.type);
      }
    } 
  }
  //Method responsible for changing the state of username
  changeUsername(username){
    this.setState ({username:username});
  }

  //Given a message object of type message, turns it into a string and sends it to the server
  sendMessagetoServer(messageObject){
    this.socket.send(JSON.stringify(messageObject));
   
  }

  //Given a message object of type notification, turns it into a string and sends it to the server
  sendNotificationToServer(notificationObject){
  this.socket.send(JSON.stringify(notificationObject));
  }

  //Rendering the main App component which consist of 3 other components [Navbar, MessageList and Chatbar]
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
