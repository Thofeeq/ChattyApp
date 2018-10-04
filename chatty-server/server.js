// server.js

const express = require('express');
const WebSocket = require('ws').Server;
const uuid = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket({ server });

//handles the broadcast event [given a data, send it to each client connected as string data]
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};
//Random num generator [To pick color for username - MDN]
function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // color array for username
  let userNameColor = ["red","blue","green","purple","Fuchsia","navy","gray"];
  let randomColor = getRandomNumber(userNameColor.length);

  //get total clients currently connected and wrap it in an object
  totalCurrentOnlineUsers = {type:"currentUserTotal", total:  wss.clients.size};
  // As long as there's a connection, always broadcast the total current online users
  wss.broadcast(totalCurrentOnlineUsers);
 
  //Handle incoming data/message to the server
  ws.on('message', function(message) {
    //Parse the data into an object so it can be modified with ease
    incomingMessage = JSON.parse(message);

    //Checking for the incoming data type [Whether its a message or a notification]
    if(incomingMessage.type === "postMessage"){
    //Modifying the recieved data/object  1. Changing the type to "incomingMessage" and 2. setting a random Color for the user by inserting new key("userColor") into the object
      incomingMessage.type = "incomingMessage";
      incomingMessage["userColor"] = userNameColor[randomColor]; 
    }
    //Modifying the type to "incomingNotification"
    else if(incomingMessage.type === "postNotification"){
      incomingMessage.type = "incomingNotification";
    }
    else{
      console.log("Invalid message type");
    }
    //Setting an UUID for each mesage
    incomingMessage["id"] = uuid();
    //Broadcast the modified message/notification object back to the clients
     wss.broadcast(incomingMessage);
 });

  

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log("Disconnected");
  // updating the current number of clients connected upon closing the socket, so that it can be broadcasted/updated on the app accordingly. 
  totalCurrentOnlineUsers = {type:"currentUserTotal", total:  wss.clients.size};
  wss.broadcast(totalCurrentOnlineUsers);});
});