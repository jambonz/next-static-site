# Using dub tracks
jambonz allows you to insert additional audio tracks into the conversation; i.e to "dub in" additional tracks using the [dub](/docs/webhooks/dub) verb. 

One common usage is to use background ambient noise to simulate an office environment, but there are many possibile ways to use this feature.

```js
const app = new WebhookResponse();
app
  .dub({
    action: 'addTrack',
    track: 'background-music',
    play: 'https://djfyg.xyz/office-sounds.mp3',
    loop: true,
    gain: '-10 dB'
  })
  ... continue with other verbs
res.status(200).json(app);
```

The `dub` verb is non-blocking, so the audio is started (or stopped, as is the case) and execution continues immediately.  A dub track can also be silenced, or totally removed at any time during the call. Dub tracks are identified by a user-specified name, e.g. "office sounds".

When a dub track is silenced, the audio is stopped and the audio source removed from the track, but the track is left in place even though it is not generating any audio.  To restart audio in the track simply issue another `playOnTrack` or `sayOnTrack` dub command and remember, you must specify the new audio source (or text) when you restart it, even if you are using the same source as earlier.

Often, when playing audio in a dub track you will want to decrease the volume (or, though less frequently, increase it).  You can do this using the `gain` options which specifies a number of decibels to increase or decrease the volume.  If you are not familiar with decibel units it is a logarithmic scale, as a rule of thumb you can keep in mind that -6 dB would reduce the audio signal strength by half.  You can also loop the audio continuously or play it once.

Sometimes, while playing audio into a dub track you may also want to adjust the audio signal strength in the main track.  You can do so using the `config.boostAudioSignal` action:

```js
const app = new WebhookResponse();
app
  .config({
    boostAudioSignal: '+1 dB'
  })
  .dub({
    action: 'addTrack',
    track: 'background-music',
      play: 'https://djfyg.xyz/office-sounds.mp3',
    loop: true,
    gain: '-10 dB'
  })
```

Dub tracks are automatically removed when the call ends, so there is no need to explicitly issue a dub verb with a `removeTrack` action during the call unless you are completely done with playing audio into the track for that call.

The `dial` verb also allows for a nested `dub` verb, which causes the party answering the call to hear the dubbed audio track.  Note that the dub track audio is always only sent to one party so in the case of a dial where dubbed audio is sent to the called party the calling party will not hear that audio track.

Finally, note that purpose of using a dub track is to blend audio into the call more or less continously, so do not use the `dub` verb for something like playing a typing sound or other "thinking noise" while an app or AI is processing a user response.  For that, use the [filler noise](/docs/supporting-articles/using-filler-noise) feature instead.