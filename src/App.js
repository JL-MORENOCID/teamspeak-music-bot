import runCommand from "./services/runCommand"
import { readFileSync } from "fs"
import { createServer } from "https"
import { Server } from "socket.io"
import { sendChannelMessage, moveChannelTo, setClientNickname, currentChannelId } from "./services/clientHandler"
import { MUSIC_CHANNEL_NAME, MUSIC_BOT_NICKNAME, SERVER_QUERY_USER, SERVER_QUERY_PASS } from "./services/settings"

// ------------

import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library"
//import with javascript
//const { TeamSpeak } = require("ts3-nodejs-library")

//create a new connection
TeamSpeak.connect({
  host: "blueclouds.es",
  protocol: QueryProtocol.RAW, //optional
  queryport: 10081, //optional
  serverport: 9987,
  username: SERVER_QUERY_USER,
  password: SERVER_QUERY_PASS,
  nickname: "NodeJS Query Framework"
}).then(async teamspeak => {
  const clients = await teamspeak.clientList({ clientType: 0 })
  clients.forEach(client => {
    console.log("Sending 'Hello!' Message to", client.nickname)
    client.message("Hello!")
  })
}).catch(e => {
  console.log("Catched an error!")
  console.error(e)
})

// ------------

// Make a call
/*
runCommand({command: "channellist"}, {"-topic": '', "-info": ''})
  .then(val => console.log(val))
*/

setClientNickname(MUSIC_BOT_NICKNAME)
moveChannelTo(MUSIC_CHANNEL_NAME)
sendChannelMessage("patata")

// HTTPS Server
const httpServer = createServer({
  key: readFileSync("src/certs/key.pem"),
  cert: readFileSync("src/certs/cert.pem")
});

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("Connected")
});
httpServer.listen(3000);

/*
listen(3000,() => {
  console.log("Started on PORT 3000")
})
*/