# Speech-to-text API
> Added in 0.8.2

jambonz provides native support for lots of speech recognition vendors, but if you want to integrate with a vendor we don't yet support you can easily do this by writing to our API.  

The STT API is based on Websockets.  

jambonz opens a Websocket connection towards a URL that you specify, and sends audio as well as JSON control text frames to your server.  Your server is responsible for implementing the interface to your chosen speech vendor and returning results in JSON format back over the Websocket connection to jambonz.

Want to look at some working code?  Check out [these examples](https://github.com/jambonz/custom-speech-example).

## Authentication

An Authorization header is sent by jambonz on the HTTP request that creates the Websocket connection.  The Authorization header contains an api key, e.g.

```js
Authorization: Bearer <apiKey>
```

When you create a custom speech vendor in the jambonz portal you will specify an api key which is then then provided in the Authorization header whenever that custom speech vendor is used in your application.

In the example below, we creeate a Custom speech service for [AssemblyAI](https://www.assemblyai.com/docs) and add an apiKey of 'foobarbazzle'.

>> Note: this is *not* the API key that you may get from AssemblyAI to use their service.

![Creating custom STT vendor](/images/creating-custom-stt-vendor.png)

## Control messages sent by jambonz

Control messages are sent as JSON frames.  Audio is sent as binary frames containing linear16 pcm-encoded audio at 8khz sampling.  

The first message that you will receive from jambonz after accepting and upgrading the http request to a Websocket connection is a "start" control message, followed by binary audio frames.

### Start control message

| property | type | description  |
| ---------|-------------| -----|
| type | String | "start" |
| language | String | ISO language code (e.g. "en-US") |
| format | String | Defines audio format.  Currently will always be "raw" |
| encoding | String | Defines how the audio is encoded.  Currently will always be "LINEAR16" |
| interimResults | Boolean | whether or not interim (partial) results are being requested |
| sampleRateHz | Number | Sample rate of audio.  Currently will always be 8000. |
| options | Object | This will contain any options that the application is passing on to the recognizer. This object may be empty. |
| options.hints | Array or Object | Any dynamic hints provided by the application. |
| options.hintsBoost | Number | A boost number to apply to the provided hints. |

### Stop control message

jambonz sends a "stop" message when it is time to stop speech recognition.  

| property | type | description  |
| ---------|-------------| -----|
| type | String | "stop" |

## Control messages sent to jambonz

Your server is responsible for sending transcriptions, as well as any errors, to jambonz.

### Transcription control message

| property | type | description  |
| ---------|-------------| -----|
| type | String | "transcription" |
| is_final | Boolean | indicates whether this is a final or interim transcription. |
| alternatives | Array | an ordered list of alternative transcriptions (must contain at least one). |
| alternatives[n].transcript | String | A transcript of the speaker's utterance. |
| alternatives[n].confidence | Number | A confidence probability, between 0 and 1. |
| language | String | the language that was recognized. |
| channel | Number | The channel number (only relevant if diarization is being performed, default to 1). |

### Error control message

| property | type | description  |
| ---------|-------------| -----|
| type | String | "error" |
| error | String | detailed error message. |


