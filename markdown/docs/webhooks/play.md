# play

The play command is used to stream recorded audio to a call.
```json
{
  "verb": "play",
  "url": "https://example.com/example.mp3"
}
```

You can use the following options in the `play` action:

| option        | description | required  |
| ------------- |-------------| -----|
| url | a single url or array of urls (will play in sequence) to a wav or mp3 file | yes |
| loop | number of times to play the url(s) | no (default: 1) |
| earlyMedia | if true and the call has not yet been answered, play the audio without answering call.  Defaults to false | no |

<p class="flex">
<a href="/docs/webhooks/pause">Prev: pause</a>
<a href="/docs/webhooks/redirect">Next: redirect</a>
</p>
