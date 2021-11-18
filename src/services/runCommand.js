import fetch from "node-fetch"
import { stringify } from "querystring"
import { API_URL, API_KEY } from './settings'

export default async function runCommand ({
  command
} = {}, ...args) {

  // Transform args data to 'GET'
  /*
  const opts = () => {
    let resolve = ""
    for (let i=0; Object.keys(args[0]).length > i; i++) {
      if (Object.values(args[0])[i] === '') {
        resolve += (Object.keys(args[0]).length-1 !== i) 
        ? Object.keys(args[0])[i] + "&"
        : Object.keys(args[0])[i]
      } else {
        resolve += (Object.keys(args[0]).length-1 !== i) 
        ? Object.keys(args[0])[i] + "=" + Object.values(args[0])[i] + "&"
        : Object.keys(args[0])[i] + "=" + Object.values(args[0])[i]
      }
    }
    return resolve
  }
  */

  const opts = () => {
    return (args.length > 0) ? stringify(args[0]) : ""
  }

  // DEBUG: REMOVE THIS
  console.log(`CALLING: ${API_URL}${command}?${opts()}`)
  
  // Get response with promise
  const response = await fetch(

    `${API_URL}${command}?${opts()}`,

    {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
    }
  )
  .catch(err => console.log(`ERROR: runCommand | ${err}`))

  return await response.json()
}