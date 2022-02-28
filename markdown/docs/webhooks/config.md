# config

The `config` verb allows the developer to change certain default settings or behaviors for the current session.  

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
      "input" : ["speech"].
      "actionHook: "/transcript"
      }
    }
  },
```
You can use the following attributes in the `config` command:

| option        | description | required  |
| ------------- |-------------| -----|
| synthesizer | change the session-level default text-to-speech settings. See [the say verb](/docs/webhooks/say) for details on the `synthesizer` property.| no |
| recognizer | change the session-level default speech recognition settings. See [the transcribe verb](/docs/webhooks/transcribe) for details on the `recognizer` property.| no |
| bargeIn.enable| if true, begin listening for speech or dtmf input while the session is executing other verbs.  This allows the developer to capture user input outside of a [gather verb](/docs/webhooks/gather).  If false, stop this background listening task.| no|
| bargeIn.actionHook | A webhook to call if user input is collected from the background listening task.| no |
| bargeIn.input | An array containing 'speech' and/or 'digits', indicating what type(s) of user input to collect | no |


<p class="flex">
<a href="/docs/webhooks/conference">Prev: Overview</a>
<a href="/docs/webhooks/dequeue">Next: dequeue</a>
</p>
