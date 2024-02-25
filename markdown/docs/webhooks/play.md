# play

The play command is used to stream recorded audio to a call.
```json
{
  "verb": "play",
  "url": "https://example.com/example.mp3",
  "timeoutSecs": 10,
  "seekOffset": 8000,
  "actionHook": "/play/action"
}
```

You can use the following options in the `play` action:

| option        | description | required  |
| ------------- |-------------| -----|
| url | a single url or array of urls (will play in sequence) to a wav or mp3 file | yes |
| loop | number of times to play the url(s) | no (default: 1) |
| earlyMedia | if true and the call has not yet been answered, play the audio without answering call.  Defaults to false | no |
| timeoutSecs | the number of seconds to play the url | no |
| seekOffset | how many samples to seek into the url | no |
| actionHook | webhook that is called when the play verb completes | no | 


<h5 id="message-action-properties">actionHook properties</h5>

The actionHook that is invoked when the `play` command completes will include the following properties:

| property name  | description | 
| ------------- |-------------|
| playback_seconds | the number of seconds played |
| playback_milliseconds | the number of milliseconds played |
| playback_last_offset_pos | the last offset position in samples |

<p class="flex">
<a href="/docs/webhooks/pause">Prev: pause</a>
<a href="/docs/webhooks/rasa">Next: rasa</a>
</p>
