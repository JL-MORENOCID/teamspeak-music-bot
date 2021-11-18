import runCommand from "./runCommand"
import { sendChannelMessage, moveChannelToName, setClientNickname } from "./clientHandler"
import { MUSIC_CHANNEL_NAME, MUSIC_BOT_NICKNAME } from "./settings"
import { EventEmitter } from "events"

/**
 * Inits bot. Sets his nickname, join channel and send welcome message
 */
export async function init() {

  const sleep = (ms) =>  {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // On any problem
  process.on('uncaughtException', (err) => {
    console.log('Caught exception: ', err)
    sendChannelMessage('Bot restarted.')
    process.exit()
  })

  await Promise.all([
    setClientNickname(MUSIC_BOT_NICKNAME),
    await sleep(300),
    moveChannelToName(MUSIC_CHANNEL_NAME),
    await sleep(300),
    sendChannelMessage("patata")
  ])
  .catch(err => console.log(`ERROR: init | ${err}`))
}