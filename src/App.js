import getData from "./services/getData"
import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library"
import { SERVER_QUERY_USER, SERVER_QUERY_PASS } from "./services/settings"

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
    client.message("Hello! PREPARA EL CULO")
    
  })
}).catch(e => {
  console.log("Catched an error!")
  console.error(e)
})

// Make a call
getData({command: "channellist"}, {"-topic": '', "-info": ''})
  .then(val => console.log(val))

/*
listen(3000,() => {
  console.log("Started on PORT 3000")
})
*/