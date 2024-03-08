# Using filler noise

Sometimes in conversational AI scenarios there may be significant latency while the remote application processes a user response and is determing the next action to take.  In these scenarios it is common to play a typing sound or other audio to provide an audio cue to the caller that the system is processing the response, that the agent is thinking or retrieving, etc.  

Support for "filler noise" can enabled either at the session level using the `config.fillerNoise` property or at the individual `gather` level using the same property.  In the example below, we set a session-wide setting for filler noise (in the form of a typing sound) to kick in after waiting 2 seconds for the remote app to respond to user input.

```js
/* websocket application */
session
  .config({
    fillerNoise: {
      enable: true,
      url: 'https://dygys.xyz/keyboard-typing.mp3',
      startDelaySecs: 2
    }
  })
  .gather({
    say: {text: 'How can I help you today.'},
    input: ['speech'],
    ...
  })
  .send();
```

Later in the app, we may decide to start the filler noise immediately because we know that processing this particular user response could be time-consuming.

```js
/* websocket application */
session
  .config({
    fillerNoise: {
      enable: true,
      url: 'https://dygys.xyz/keyboard-typing.mp3',
      startDelaySecs: 2
    }
  })
  .gather({
    say: {text: 'OK, would you like me to go ahead and book the flight for you?'},
    input: ['speech'],
    fillerNoise: {
      enable: true,
      startDelaySecs: 0
    }
    ...
  })
  .send();
```

Note that I could have also overridden the url to play at that gather level, but in this case I chose to only override the delay (setting it to zero) and use the session-level typing sound.