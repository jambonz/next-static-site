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
| recognizer.transcriptionHook | Webhook to receive an HTPP POST when an interim or final transcription is received. | yes |
| [recognizer](/docs/webhooks/recognizer) | Speech recognition options | yes |

<p class="flex">
<a href="/docs/webhooks/tag">Prev: tag</a>
<span>&nbsp;</span>
</p>
