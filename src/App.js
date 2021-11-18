import runCommand from "./services/runCommand"
import { readFileSync } from "fs"
import { createServer } from "https"
import { Server } from "socket.io"
import { sendChannelMessage, moveChannelToName, setClientNickname, replyClientOnCurrentChannel} from "./services/clientHandler"
import { MUSIC_CHANNEL_NAME, MUSIC_BOT_NICKNAME, SERVER_QUERY_USER, SERVER_QUERY_PASS } from "./services/settings"
import { init } from './services/init'

// Make a call
/*
runCommand({command: "channellist"}, {"-topic": '', "-info": ''})
  .then(val => console.log(val))
*/

init()

//replyClientOnCurrentChannel(103, "eh")

//sendChannelMessage("patata")
//moveChannelTo(MUSIC_CHANNEL_NAME)
//setClientNickname(MUSIC_BOT_NICKNAME)

// HTTPS Server >>
/*
const httpServer = createServer({
  key: readFileSync("src/certs/key.pem"),
  cert: readFileSync("src/certs/cert.pem")
});

const io = new Server(httpServer, { /* options */ /* })

io.on("connection", (socket) => {
  console.log("Connected")
})
httpServer.listen(3000)
*/

// Keeping connection alive every 4 min
setInterval(() => {
  runCommand({command: "version"}, {})
}, 240000)

/*
listen(3000,() => {
  console.log("Started on PORT 3000")
})
*/