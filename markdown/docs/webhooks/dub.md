# dub
> Added in v0.8.6

The `dub` verb adds an additional audio track to the conversation. The purpose is to "dub" audio into the channel that plays over the top of the content of the `play` and `say` verbs.  The dub command is non-blocking so that once the audio is started execution proceeds immediately to the next verb.  A maximum of two additional tracks may be added to the conversation.

```json
  {
    "verb": "dub",
    "action": "addTrack",
    "track": "ambient-noise",
  },
  {
    "verb": "dub",
    "action": "playOnTrack",
    "track": "ambient-noise",
    "play": "https://example.com/sounds/office-hubbub.mp3"
  }
```
You can use the following attributes in the `dub` command:

| option        | description | required  |
| ------------- |-------------| -----|
| action | one of 'addTrack', 'removeTrack', 'silenceTrack', 'playOnTrack', or 'sayOnTrack' | yes |
| track | label for the track | yes |
| play | an http(s) url to an mp3 file to play into the track | no |
| say | text to convert to audio and play into the track| no |
| loop | boolean; if true, loop the mp3 | no |
| gain | integer (e.g. -6) or string (e.g. "-6 dB) specifying decibels to boost or reduce the audio signal | no |

The various options are:
- `addTrack` adds an audio track to the conversation; once added, the `play` or `say` command may be used to inject audio into the track
- `removeTrack` removes an audio track from the conversation
- `silenceTrack` silences an audio track but leaves it in place
- `play` plays audio from an http(s) url into the audio track
- `say` generates text-to-speech into the audio track

Note: all tracks are automatically removed when the call completes, so if using an additional track for the entire conversation there is no need to explicitly remove it when the call ends.

Note: for convenience the `addTrack` and `play` operations may be combined in a single verb; e.g.:

```json
  {
    "verb": "dub",
    "action": "addTrack",
    "track": "ambient-noise",
    "play": "https://example.com/sounds/office-hubbub.mp3",
    "loop": true,
    "gain": "-10 dB"
  }
```

<p class="flex">
<a href="/docs/webhooks/dtmf">Prev: DTMF</a>
<a href="/docs/webhooks/enqueue">Next: enqueue</a>
</p>
