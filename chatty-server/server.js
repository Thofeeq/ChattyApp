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

wss.broadcast = function broadcast(data) {

  wss.clients.forEach(function each(client) {
//Question for mentor(check the if statement in ws doc)(WHY did we need the if check? and why did it fail?)
    console.log("WE BROAD: " + JSON.stringify(data))
      client.send(JSON.stringify(data));
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');


  totalCurrentOnlineUsers = {type:"currentUserTotal", total:  wss.clients.size};


    wss.broadcast(totalCurrentOnlineUsers);
 
  
  ws.on('message', function(message) {

    incomingMessage = JSON.parse(message);
    console.log(incomingMessage.username + " said " + incomingMessage.content);
    if(incomingMessage.type === "postMessage"){
      incomingMessage.type = "incomingMessage";
    }
    else if(incomingMessage.type === "postNotification"){
      incomingMessage.type = "incomingNotification";
    }
    else{
      console.log("Invalid message type");
    }
    
    incomingMessage["id"] = uuid();
     wss.broadcast(incomingMessage);
     

 });
  // ws.onmessage = function (event) {
  //  incomingMessage = JSON.parse(event.data);
  //  console.log(incomingMessage.username + " said " + incomingMessage.content);
  //  incomingMessage["id"] = uuid();
  
  //  ws.send(JSON.stringify(incomingMessage));
  //   wss.broadcast(JSON.stringify(incomingMessage));
  // }

  

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log("Disconnected");
  totalCurrentOnlineUsers = {type:"currentUserTotal", total:  wss.clients.size};
  wss.broadcast(totalCurrentOnlineUsers);});
});