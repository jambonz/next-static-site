# transcribe

The transcribe verb is used to send real time transcriptions of speech to a web callback.

The transcribe command is only allowed as a nested verb within a dial or listen verb.  Using transcribe in a dial command allows a long-running transcription of a phone call to be made, while nesting within a listen verb allows transcriptions of recorded messages (e.g. voicemail).

```json
{
  "verb": "transcribe",
  "transcriptionHook": "http://example.com/transcribe",
  "recognizer": {
    "vendor": "Google",
    "language" : "en-US",
    "interim": true
  }
}
```

You can use the following options in the `transcribe` command:

| option        | description | required  |
| ------------- |-------------| -----|
| recognizer.dualChannel | if true, transcribe the parent call as well as the child call | no |
| recognizer.interim | if true interim transcriptions are sent | no (default: false) |
| recognizer.language | language to use for speech transcription | yes |
| recognizer.profanityFilter | if true, filter profanity from speech transcription.  Default:  no| no |
| recognizer.vendor | speech vendor to use (currently only Google supported) | no |
| transcriptionHook | webhook to call when a transcription is received. Due to the richness of information in the transcription an HTTP POST will always be sent. | yes |

> **Note**: the `dualChannel` property is not currently implemented.

<p class="flex">
<a href="/docs/webhooks/tag">Prev: tag</a>
<span>&nbsp;</span>
</p>
