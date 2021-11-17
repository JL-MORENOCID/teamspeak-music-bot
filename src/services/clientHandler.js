import runCommand from "./runCommand"

/**
 * Sends channel message by client.
 * @param {String} message 
 */
export function sendChannelMessage(message) {
  runCommand({command: 'sendtextmessage'}, {
    targetmode: 2, // Target level 2 = CHANNEL
    target: 0, // current serveradmin channel
    msg: message
  })
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}


/**
 * Moves client to specific channel_name
 * @param {String} channel_id 
 */
 export async function moveChannelTo(channel_name) {
  const channel_id = await getChannelId(channel_name)
  const client_id = await currentClientId()
  await runCommand({command: 'clientmove'}, {cid: channel_id, clid: client_id})
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}

/**
 * Returns channel id
 * @param {String} channel_name 
 */
export async function getChannelId(channel_name) {
  return await runCommand({command: 'channelfind'}, {pattern: channel_name})
  .then(val => {
    if (val.status.message !== 'ok') { // Channel not found
      console.log(`ERROR "${val.status.message}": going to "Default Channel".`)
      return 1
    } else { // Channel found
      return val.body[0].cid
    }
  })
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}

/**
 * Get current client channel.
 */
export async function currentChannelId() {
  return await runCommand({command: 'whoami'}, {})
  .then(val => {
    return val.body[0].client_channel_id
  })
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}

/**
 * Get current client id.
 * @returns
 */
export async function currentClientId() {
  return await runCommand({command: 'whoami'}, {})
  .then(val => {
    return val.body[0].client_id
  })
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}

/**
 * Sets client nickname
 * @param {String} new_nick 
 */
export function setClientNickname(new_nick) {
  runCommand({command: 'clientupdate'}, {client_nickname: new_nick})
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}