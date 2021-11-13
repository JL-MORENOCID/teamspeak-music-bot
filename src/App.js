import getData from "./services/getData"
import { readFileSync } from "fs"
import { createServer } from "https"
import { Server } from "socket.io"
import { SERVER_QUERY_USER, SERVER_QUERY_PASS } from "./services/settings"

// Make a call
getData({command: "channellist"}, {"-topic": '', "-info": ''})
  .then(val => console.log(val))

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