# listen

jambonz does not have a 'record' verb. This is by design, for data privacy reasons:  

>Recordings can contain sensitive and confidential information about your customers, and such data is never stored at rest in the jambonz core.

Instead, jambonz provides the **listen** verb, where an audio stream(s) can be forked and sent in real-time to your application for processing.

The listen verb can also be nested in a [dial](/docs/webhooks/dial) or [config](/docs/webhooks/config) verb, which allows the audio for a call between two parties to be sent to a remote websocket server.

To utilize the listen verb, the customer must implement a websocket server to receive and process the audio.  The endpoint should be prepared to accept websocket connections with a subprotocol name of 'audio.jambonz.org'.  

The format of the audio data sent over the websocket is 16-bit PCM encoding, with a user-specified sample rate.  The audio is sent in binary frames over the websocket connection.  

Additionally, one text frame is sent immediately after the websocket connection is established.  This text frame contains a JSON string with all of the call attributes normally sent on an HTTP request (e.g. callSid, etc), plus **sampleRate** and **mixType** properties describing the audio sample rate and stream(s).  Additional metadata can also be added to this payload using the **metadata** property as described in the table below.  Once the intial text frame containing the metadata has been sent, the remote side should expect to receive only binary frames, containing audio.  

Note that the remote side can optionally send messages and audio back over the websocket connection, as described below in [Bidirectional Audio](#bidirectional_audio).

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
|bidirectionalAudio.enabled|if true, enable bidirectional audio | no (default: true)|
|bidirectionalAudio.streaming|if true, enable streaming of audio from your application to jambonz (and the remote caller)|no (default: false)|
|bidirectionalAudio.sampleRate|required if streaming| no|
|disableBidirectionalAudio| (deprecated) if true, disable bidirectional audio (same as setting bidirectionalAudio.enabled = false)|no|
| finishOnKey | The set of digits that can end the listen action | no |
| maxLength | the maximum length of the listened audio stream, in secs | no |
| metadata | arbitrary data to add to the JSON payload sent to the remote server when websocket connection is first connected | no |
| mixType | "mono" (send single channel), "stereo" (send dual channel of both calls in a bridge), or "mixed" (send audio from both calls in a bridge in a single mixed audio stream) Default: mono | no |
| passDtmf | if true, any dtmf digits detected from the caller will be passed over the websocket as text frames in JSON format.  Default: false| no |
| playBeep | true, false whether to play a beep at the start of the listen operation.  Default: false | no |
| sampleRate | sample rate of audio to send (allowable values: 8000, 16000, 24000, 48000, or 64000).  Default: 8000 | no |
| timeout | the number of seconds of silence that terminates the listen operation.| no |
| transcribe | a nested [transcribe](/docs/webhooks/transcribe) verb | no |
| url | url of remote server to connect to | yes |
| wsAuth.username | HTTP basic auth username to use on websocket connection | no |
| wsAuth.password | HTTP basic auth password to use on websocket connection | no |

<h4 id="pass_dtmf">Passing DTMF</h4>

Any DTMF digits entered by the far end party on the call can optionally be passed to the websocket server as JSON text frames by setting the `passDtmf` property to `true`. Each DTMF entry is reported separately in a payload that contains the specific DTMF key that was entered, as well as the duration which is reported in RTP timestamp units.  The payload that is sent will look like this:

```json
{
  "event": "dtmf",
  "dtmf": "2",
  "duration": "1600"
}
```

<h4 id="bidirectional_audio">Bidirectional audio</h4>

Audio can also be sent back over the websocket to jambonz.  This audio, if supplied, will be played out to the caller.  (Note: Bidirectional audio is not supported when the `listen` is nested in the context of a `dial` verb).

There are two separate modes for bidirectional audio:
- non-streaming, where you provide a full base64-encoded audio file as JSON text frames
- streaming, where stream audio as L16 pcm raw audio as binary frames

<h5 id="bidirectional_audio_non_streaming">non-streaming</h5>

The far-end websocket server supplies bidirectional audio by sending a JSON text frame over the websocket connection:
```json
{
  "type": "playAudio",
  "data": {
    "audioContent": "base64-encoded content..",
    "audioContentType": "raw",
    "sampleRate": "16000"
  }
}
```
In the example above, raw (headerless) audio is sent.  The audio must be 16-bit pcm encoded audio, with a configurable sample rate of either 8000, 16000, 24000, 32000, 48000, or 64000 khz.  Alternatively, a wave file format can be supplied by using type "wav" (or "wave"), and in this case no `sampleRate` property is needed.  In all cases, the audio must be base64 encoded when sent over the socket.

If multiple playAudio commands are sent before the first has finished playing they will be queued and played in order. You may have up to 10 queued playAudio commands at any time.

Once a `playAudio` command has finished playing out the audio, a `playDone` json text frame will be sent over the websocket connection:
```json
{
  "type": "playDone"
}
```
A `killAudio` command can also be sent by the websocket server to stop the playout of audio that was started via a previous `playAudio` command:
```json
{
  "type": "killAudio"
}
```
And finally, if the websocket connection wishes to end the `listen`, it can send a `disconnect` command:
```json
{
  "type": "disconnect"
}
```

<h5 id="bidirectional_audio_streaming">streaming</h5>

To enable streaming bidirectional audio, you must explicitly enable it as shown below:
```js
{
  verb: 'listen',
  bdirectionalAudio: {
    enabled: true,
    streaming: true,
    sampleRate: 8000
  }
}
```

Your application should then send binary frames of linear-16 pcm raw data with the specified sample rate over the websocket connection.

<p class="flex">
<a href="/docs/webhooks/lex">Prev: lex</a>
<a href="/docs/webhooks/message">Next: message</a>
</p>
