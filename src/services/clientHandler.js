import runCommand from "./runCommand"

export async function handleChannelCommand(message) {
  let { msg, client } = message
  msg = msg.toString().trim()
  console.log(`Message received from ${invokername}[${invokerid}]: ${msg}`)

  if (!msg.startsWith('!')) // Not a command
    return

  let [cmd, ...args] = msg.substring(1).split(' ')
  switch (cmd.toLowerCase()) {
    default: // Unknown
      sendChannelMessage(client, 'Unknown command: ' + msg)
      break
    case 'git': // Git commands
      if (args.length < 1) {
        sendChannelMessage('ERROR: git | You send the command without any param.')
        break
      } else {
        // manage args command
      }
  }
}

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
 * @param {String} channel_name 
 */
 export async function moveChannelToName(channel_name) {
  const channel_id = await getChannelId(channel_name)
  await sleep(300)
  const client_id = await currentClientId()
  await sleep(300)
  await runCommand({command: 'clientmove'}, {cid: channel_id, clid: client_id})
  .catch(err => console.log(`ERROR: ClientHandler | ${err}`))
}


/**
 * Moves client to specific channel_id (cid)
 * @param {Number} channel_id
 */
export async function moveChannelToId(channel_id) {
  const client_id = await currentClientId()
  await sleep(300)
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
 * Get client by id.
 */
 export async function getClientById(id) {
  return await runCommand({command: 'clientinfo'}, {clid: id})
  .then(val => {
    return val.body[0]
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

// ---
export async function replyClientOnCurrentChannel(clid, text) {

  if (await currentClientId() === clid) return
  await sleep(300)

  getClientById(clid)
  .then(async data => {
    await moveChannelToId(data.cid) // Move bot to sender channel
    sendChannelMessage(`> ${data.client_nickname}:   ${text.charAt(0).toUpperCase() + text.slice(1)}`)
  })
  .catch(console.error)
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}