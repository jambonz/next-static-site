
![Dub](/images/dubbing.png)
> Added in v0.8.6

The `dub` verb adds one or more additional audio tracks into the conversation (currently, a max of two additional audio tracks may be added). Audio can then be inserted into these tracks and it will be blended with the `play` or `say` content being sent to the caller/called party.  The source of the audio content can be either text to speech or mp3 audio accessible via http(s).

Additionally, the volume (gain) of the inserted audio may be adjusted up or down.  As well, the [config.boostAudioSignal](/docs/webhooks/config) allows the volume in the main conversational channel to be adjusted as well.

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
Verb properties for the `dub` command:

| option        | description | required  |
| ------------- |-------------| -----|
| action | one of 'addTrack', 'removeTrack', 'silenceTrack', 'playOnTrack', or 'sayOnTrack' | yes |
| track | label for the track | yes |
| play | an http(s) url to an mp3 file to play into the track | no |
| say | text to convert to audio and play into the track| no |
| loop | boolean; if true, loop the mp3 | no |
| gain | a string value in the format "-6 dB" specifying decibels to boost or reduce the strength of the audio signal (note: simple integer values accepted as well). The value supplied must be between +- 50 dB.| no |

The various options are:
- `addTrack` adds an audio track to the conversation; once added, the `play` or `say` command may be used to inject audio into the track
- `removeTrack` removes an audio track from the conversation
- `silenceTrack` silences an audio track but leaves it in place
- `playOnTrack` plays audio from an http(s) mp3 url into the audio track
- `sayOnTrack` generates text-to-speech into the audio track

Note: all tracks are automatically removed when the call completes, so if using an additional track for the entire conversation there is no need to explicitly remove it when the call ends.

Note: for convenience the `addTrack` and `playOnTrack` operations may be combined into a single `addTrack` verb; e.g.:

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

See [Using dub tracks](/docs/supporting-articles/using-dub-tracks) for more information.

<p class="flex">
<a href="/docs/webhooks/dtmf">Prev: DTMF</a>
<a href="/docs/webhooks/enqueue">Next: enqueue</a>
</p>
