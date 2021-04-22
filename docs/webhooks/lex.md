# lex

The 'lex' verb connects a call to an [Amazon Lex](https://aws.amazon.com/lex/) V2 bot. 

```json
{
  "verb": "lex",
  "botId": "MTLNerCD9L",
  "botAliasId": "z5yY1iYykE",
  "region": "us-east-1",
  "locale": "en_US",
  "credentials": {
    "accessKey": "XXXX",
    "secretAccessKey": "YYYY"
  },
  "passDtmf": true,
  "intent": "BookHotel",
  "metadata": {
    "slots": {
      "Location": "Los Angeles"
    },
    "context": {
      "callerId": "+15083084909",
      "customerName": "abc company"
    }
  },
  "tts": {
    "vendor": "Google",
    "language": "en-US",
    "voice": "en-US-Wavenet-C"
  }
  "eventHook": "/lex-events"
}
```

 The following features are supported:

- optionally specify an initial, or "welcome" intent,
- pre-fill slot values for the initial intent,
- provide text for a spoken welcome message at the start of the conversation,
- play lex-generated audio, or use text-to-speech with either AWS/Polly or Google voices,
- receive real-time notifications of intents and transcriptions as the conversation progresses, and
- provide arbitrary context data to the lex backend to help guide the flow.
You can use the following options in the `lex` verb:

| option        | description | required  |
| ------------- |-------------| -----|
| botID | Lex bot ID | yes |
| botAliasId | Lex bot alias ID | yes |
| credentials | AWS credentials | yes |
| credentials.accessKey | AWS access key id | yes |
| credentials.secretAccessKey | AWS secret access key id | yes |
| region | AWS region bot is running in | yes |
| locale | language code of speaker (currently supported languages:<br/> en_AU, en_GB, en_US, fr_CA, fr_FR, es_ES, es_US, it_IT)| yes |
| eventHook | A webhook to invoke when a Lex event occurs (e.g intent detected, transcription, etc) | no | 
| intent | initial intent to trigger (i.e. "welcome intent") | no |
| welcomeMessage | text for a welcome message to play to the caller | no |
| noInputTimeout | timeout in millseconds Lex will wait for a response before triggering fallback intent | no |
| tts | if provided, playback will use text-to-speech rather than Lex-generated audio | no |
| tts.vendor | 'aws', 'Google', or 'default' | no |
| tts.language | language identifier or 'default' | no |
| tts.voice | voice identifier or 'default' | no |
| metadata | initial slot values and context data | no |
| metadata.slots | key-value pairs for slot names and initial values to be pre-filled | no |
| metadata.context | key-value pairs for context data to pass to Lex bot | no |
| metadata['x-amz-lex:channels:platform'] | name of voice platform | no |

The *eventHook* webhook will contain two parameters: `event` and `data`.  The `event` parameter identifies the specific event and the `data` parameter is an object containng event data associated with the event.  The following events are supported:

- `intent`: Lex detected an intent
- `transcription`: a speech transcription was returned from Lex
- `response-text`: Lex returned a response in the form of text
- `dmtf`: a dtmf key was pressed by the caller
- `start-play`: an audio segment returned from Lex or TTS started to play
- `stop-play`: an audio segment returned from Lex or TTS completing playing
- `play-interrupted`: an audio segment was interrupted

<p>
<a href="/docs/webhooks/leave" style="float: left;">Prev: leave</a>
<a href="/docs/webhooks/listen" style="float: right;">Next: listen</a>
</p>
