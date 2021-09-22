# listen

jambonz does not have a 'record' verb. This is by design, for data privacy reasons:  

>Recordings can contain sensitive and confidential information about your customers, and such data is never stored at rest in the jambonz core.

Instead, jambonz provides the **listen** verb, where an audio stream(s) can be forked and sent in real-time to your application for processing.

The listen verb can also be nested in a [dial](#dial) verb, which allows the audio for a call between two parties to be sent to a remote websocket server.

To utilize the listen verb, the customer must implement a websocket server to receive and process the audio.  The endpoint should be prepared to accept websocket connections with a subprotocol name of 'audio.jambonz.org'.  

The listen verb includes a **url** property which is the url of the remote websocket server to send the audio to. The url may be an absolute or relative URL. HTTP Basic Authentication can optionally be used to protect the websocket endpoint by using the **wsAuth** property.

The format of the audio data sent over the websocket is 16-bit PCM encoding, with a user-specified sample rate.  The audio is sent in binary frames over the websocket connection.  

Additionally, one text frame is sent immediately after the websocket connection is established.  This text frame contains a JSON string with all of the call attributes normally sent on an HTTP request (e.g. callSid, etc), plus **sampleRate** and **mixType** properties describing the audio sample rate and stream(s).  Additional metadata can also be added to this payload using the **metadata** property as described in the table below.  Once the intial text frame containing the metadata has been sent, the remote side should expect to receive only binary frames, containing audio.  The remote side is not expected to send any data back over the websocket.

```json
{
  "verb": "listen",
  "url": "wss://myrecorder.example.com/calls",
  "mixType" : "stereo"
}
```

You can use the following options in the `listen` action:

| option        | description | required  |
| ------------- |-------------| -----|
| actionHook | webhook to invoke when listen operation ends.  The information will include the duration of the audio stream, and also a 'digits' property if the recording was terminated by a dtmf key. | yes |
| finishOnKey | The set of digits that can end the listen action | no |
| maxLength | the maximum length of the listened audio stream, in secs | no |
| metadata | arbitrary data to add to the JSON payload sent to the remote server when websocket connection is first connected | no |
| mixType | "mono" (send single channel), "stereo" (send dual channel of both calls in a bridge), or "mixed" (send audio from both calls in a bridge in a single mixed audio stream) Default: mono | no |
| playBeep | true, false whether to play a beep at the start of the listen operation.  Default: false | no |
| sampleRate | sample rate of audio to send (allowable values: 8000, 16000, 24000, 48000, or 64000).  Default: 8000 | no |
| timeout | the number of seconds of silence that terminates the listen operation.| no |
| transcribe | a nested [transcribe](#transcribe) verb | no |
| url | url of remote server to connect to | yes |
| wsAuth.username | HTTP basic auth username to use on websocket connection | no |
| wsAuth.password | HTTP basic auth password to use on websocket connection | no |

<p class="flex">
<a href="/docs/webhooks/lex">Prev: lex</a>
<a href="/docs/webhooks/message">Next: message</a>
</p>
