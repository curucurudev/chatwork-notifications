import * as core from '@actions/core'
import axios from 'axios'

async function run(): Promise<void> {
  try {
    const token = core.getInput('CHATWORK_API_TOKEN')
    const roomID = core.getInput('CHATWORK_ROOM_ID')
    const message = core.getInput('CHATWORK_MESSAGES')
    const url = `https://api.chatwork.com/v2/rooms/${roomID}/messages`

    const encodedParams = new URLSearchParams()
    encodedParams.set('self_unread', '0')
    encodedParams.set('body', message)

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'X-ChatWorkToken': token
      }
    }
    await axios.post(url, encodedParams, options)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
