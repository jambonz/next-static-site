# config

The `config` verb allows the developer to change the default speech settings for the current session, or to listen in the background while other verbs are executing.  The latter technique is useful mainly for certain scenarios when integrating with some conversational AI systems.

This verb is non-blocking; i.e. the specified settings are changed and execution immediately continues with the next verb in the application.

```json
  {
    "verb": "config",
    "synthesizer": {
      "voice": "Jenny"
    },
    "recognizer": {
      "vendor": "google",
      "language": "de-DE"
    },
    "bargeIn": {
      "enable": true,
      "input" : ["speech"],
      "actionHook: "/userInput"
      }
    }
  },
```
You can use the following attributes in the `config` command:

| option        | description | required  |
| ------------- |-------------| -----|
| synthesizer | change the session-level default text-to-speech settings. See [the say verb](/docs/webhooks/say) for details on the `synthesizer` property.| no |
| recognizer | change the session-level default speech recognition settings. See [the transcribe verb](/docs/webhooks/transcribe) for details on the `recognizer` property.| no |
| bargeIn.enable| if true, begin listening for speech or dtmf input while the session is executing other verbs.  This is known as a "background gather" and an application to capture user input outside of a [gather verb](/docs/webhooks/gather).  If false, stop any background listening task that is in progress| no|
| bargeIn.actionHook | A webhook to call if user input is collected from the background gather.| no |
| bargeIn.input |Array, specifying allowed types of input: ['digits'], ['speech'], or ['digits', 'speech']. | yes |
| bargeIn.finishOnKey | Dmtf key that signals the end of dtmf input | no |
| bargeIn.numDigits | Exact number of dtmf digits expected to gather | no |
| bargeIn.minDigits | Minimum number of dtmf digits expected to gather.  Defaults to 1. | no |
| bargeIn.maxDigits | Maximum number of dtmf digits expected to gather | no |
| bargeIn.interDigitTimeout | Amount of time to wait between digits after minDigits have been entered.| no |


<p class="flex">
<a href="/docs/webhooks/conference">Prev: Conference</a>
<a href="/docs/webhooks/dequeue">Next: dequeue</a>
</p>
