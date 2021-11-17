import { sendChannelMessage, moveChannelTo, setClientNickname } from "./clientHandler"
import { MUSIC_CHANNEL_NAME, MUSIC_BOT_NICKNAME } from "./settings"

/**
 * Inits bot. Sets his nickname, join channel and send welcome message
 */
export async function init() {
  
  const sleep = (ms) =>  {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }
  
  try {
    await Promise.all([
      setClientNickname(MUSIC_BOT_NICKNAME),
      await sleep(300),
      moveChannelTo(MUSIC_CHANNEL_NAME),
      await sleep(300),
      sendChannelMessage("patata")
    ])
    .catch(err => console.log(`ERROR: init | ${err}`))
  
    let user = users.map(item => item.name)
    let todo = todos.map(item => item.title)
    console.log(user)
    console.log(todo)
  
  } catch (error) {
    console.log(`ERROR: init | ${error}`)
  }
}