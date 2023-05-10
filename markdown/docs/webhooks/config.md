# config
> Added in v0.7.4

The `config` verb allows the developer to change the default speech settings for the current session, or to gather speech or dtmf input in the background while other verbs are executing.  The latter technique is useful mainly for certain scenarios when integrating with certain conversational AI systems.

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
| notifyEvents | boolean, whether to enable event notifications (verb:status messages) over websocket connections.  Verbs that are sent over the websocket must also contain an "id" property to activate this feature.|no|
|bargein|this object contains properties that are used to instantiate a 'background' [gather verb](/docs/webhooks/gather)|no|
| bargeIn.enable| if true, begin listening for speech or dtmf input while the session is executing other verbs.  This is known as a "background gather" and an application to capture user input outside of a [gather verb](/docs/webhooks/gather).  If false, stop any background listening task that is in progress| no|
| bargeIn.sticky | If true and bargeIn.enable is true, then when the background gather completes with speech or dtmf detected, it will automatically start another background gather|no|
| bargeIn.actionHook | A webhook to call if user input is collected from the background gather.| no |
| bargeIn.input |Array, specifying allowed types of input: ['digits'], ['speech'], or ['digits', 'speech']. | yes |
| bargeIn.finishOnKey | Dmtf key that signals the end of dtmf input | no |
| bargeIn.numDigits | Exact number of dtmf digits expected to gather | no |
| bargeIn.minDigits | Minimum number of dtmf digits expected to gather.  Defaults to 1. | no |
| bargeIn.maxDigits | Maximum number of dtmf digits expected to gather | no |
| bargeIn.interDigitTimeout | Amount of time to wait between digits after minDigits have been entered.| no |
| listen | a nested [listen](/docs/webhooks/listen) action, which allows recording of the call from this point forward by streaming the audio to a remote server over a websocket connection | no |
|amd|enable answering machine detection; see [answering machine detection](/docs/supporting-articles/answering-machine-detection) for details|no|
|record|options to manage [call recording using SIPREC](/docs/supporting-articles/siprec-client)|no|
|record.action|"startCallRecording", "stopCallRecording", "pauseCallRecording", or "resumeCallRecording"|yes|
|record.siprecServerURL|sip uri for SIPREC server|required if action is "startCallRecording"|
|record.recordingID|user-supplied string to identify the recording|no|



<p class="flex">
<a href="/docs/webhooks/conference">Prev: Conference</a>
<a href="/docs/webhooks/dequeue">Next: dequeue</a>
</p>
