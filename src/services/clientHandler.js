import getData from "./getData"

/**
 * Sends channel message by client
 * @param {*} client 
 * @param {*} message 
 */
export function sendChannelMessage(message) {
  getData({command: 'sendtextmessage'}, {
    targetmode: 2, // Target level 2 = CHANNEL
    target: 0, // current serveradmin channel
    msg: message
  })
  .then((val) => {return val})
  .catch(console.error)
}


/**
 * Moves client to specific channel_id
 * @param {Number} channel_id 
 */
 export async function moveChannelTo(channel_name) {
  
  const channel_id = getChannelId(channel_name)

  //console.log(channel_id)

  /*
  const botname = "serverAdmin"
  const clientList = getData({command: 'clientlist'}).then((val) => {return val})
  const channelList = getData({command: 'channellist'})
  //const clientList = await client.send("clientlist");
  //const channelList = await client.send('channellist');

  let serverAdmin = (clientList.response || []).find((obj) => {
      return obj.client_type === 1 && obj.client_nickname.match(
          new RegExp(`^${escapeRegExp(botname)}`, 'i'));
  });

  if (serverAdmin) {
      if (serverAdmin.cid !== channel_id) { //if serverAdmin is not already in target channel
          getData({command: 'clientmove'}, {clid: serverAdmin.clid, cid: channel_id});
          let channel_name = channelList.response.find((obj) => obj.cid === channel_id).channel_name;
          console.log(`${botname} moved to: ${channel_name}, cid: ${channel_id}`);
      }
  } else
      console.error('Music bot or serverAdmin has not been found');
  */
}

/**
 * Returns channel id
 * @param {String} channel_name 
 */
export function getChannelId(channel_name) {
  getData({command: 'channelfind'}, {pattern: channel_name})
  .then( (val) => {
    if (typeof val.body[0].cid !== 'undefined') { // Channel not found
      console.log('Channel name not found, going to "Default Channel".')
      return 1
    } else { // Channel found
      return val.body[0].cid
    }
  })
}

// TO DO
export function currentChannelId() {
  
}

/**
 * Sets client nickname
 * @param {String} new_nick 
 */
export function setClientNickname(new_nick) {
  getData({command: 'clientupdate'}, {client_nickname: new_nick})
}