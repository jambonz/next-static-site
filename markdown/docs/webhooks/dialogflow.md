# dialogflow
The `dialogflow` verb is used to connect a call to a [Google Dialogflow](https://cloud.Google.com/dialogflow) bot.

```json
{
  "verb": "dialogflow",
  "project": "ai-in-rtc-drachtio-tsjjpn",
  "lang": "en-US",
  "credentials": "{\"type\": \"service_account\",\"project_id\": \"prj..",
  "welcomeEvent": "welcome",
  "eventHook": "/dialogflow-event",
  "actionHook": "/dialogflow-action"
}
```

You can use the following options in the `dialogflow` verb:

| option        | description | required  |
| ------------- |-------------| -----|
| project | the Google dialogflow project id | yes |
| lang | language to use for speech recognition | yes |
| credentials | the service account key in JSON string form that is used to authenticate to dialogflow | yes |
| welcomeEvent | An event to send to dialogflow when first connecting; e.g. to trigger a welcome prompt | no |
| welcomeEventParams | An object containing parameters to send with the welcome event | no |
| noInputTimeout | Number of seconds of no speech detected after which to reprompt | no |
| noInputEvent | Name of dialogflow event to send in query when no input timeout expires | no |
| passDtmfAsTextInput | If true, pass user dtmf entries as text inputs to the dialogflow bot | no |
| thinkingMusic | A url to a .wav or .mp3 file to play as filler music while the dialogflow back-end is executing | no |
| actionHook | A webhook invoke when operation completes.<br/>See below for specified request parameters.| no |
| eventHook | A webhook to invoke when a dialogflow event occurs, such as an intent being detected or a speech transcription being returned.  <br/>The response to the event hook may contain a new jambonz application to execute| no|
| tts | if provided, audio prompts will be played using text-to-speech rather than the dialogflow-provided audio clips | no |
| tts.vendor | speech vendor to use: Google, aws (alias: polly), or default (for application default) | no |
| bargein | if true, kill playback immediately when user begins speaking | no|
| tts.language | language code to use.  | yes |
| tts.gender | (Google only) MALE, FEMALE, or NEUTRAL.  | no |
| tts.voice | voice to use.  Note that the voice list differs whether you are using aws or Google. Defaults to application setting, if provided. | no |

The *actionHook* webhook will contain the following additional parameters:

- `dialogflowResult`: the completion reason:
    - `redirect` - a new application was returned from an event webhook
    - `completed` - an intent with `end iteraction` set to true was received from dialogflow

The *eventHook* webhook will contain two parameters: `event` and `data`.  The `event` parameter identifies the specific event and the `data` parameter is an object containng event data associated with the event.  The following events are supported:

- `intent`: dialogflow detected an intent
- `transcription`: a speech transcription was returned from dialogflow
- `dmtf`: a dtmf key was pressed by the caller
- `start-play`: an audio segment returned from dialogflow started to play
- `stop-play`: an audio segment returned from dialogflow completing playing
- `no-input`: the no input timer elapsed with no input detected from the caller

Please refer to [this tutorial](/tutorials/#building-voicebots-using-jambonz-and-dialogflow) for a detailed example.

### call transfer in Dialogflow

Call transfer from a dialogflow bot is achieved by responding to an eventHook with event `intent` by returning a new jambonz application containing a [dial](#dial) verb.  Of course, this should only be done if the intent is signaling a request for a call transfer.

Indicating a desire to transfer the call to a live agent can be done in a couple of different ways in the dialogflow editor:

1. By adding a Dialogflow Phone Gateway Response to the intent, with a Transfer Call action.  
1. By adding a custom payload in a response to the intent, with arbitrary JSON content that you define and which should include the telephone number (or registered user, or sip endpoint) to transfer to.

> Note: option 1 only works when transferring to a US number, because the dialogflow editor only accepts US destinations.  To transfer to non-US destinations, use option 2.

In either case, your application is responsible for having an eventHook that parses the intent (found in the `data` property of the webhook content) in order to check if call transfer is being requested, and if so responding with a new jambonz application.

For instance, when the Dialogflow Phone Gateway Response is used (option 1 above), the code snippet below shows where to find the transfer number in the intent data provided in the eventHook.
```js
const evt = req.body; 
if (evt.event === 'intent') {
    const qo = evt.data.query_result;
    const transfer = qo.fulfillment_messages.find((fm) => {
      return fm.platform === 'TELEPHONY' && fm.telephony_transfer_call;
    });
    if (transfer) {
        // a transfer has been requested
        // transfer.telephony_transfer_call.phone_number has the phone number to transfer to
    }
}
```

Please refer to [this tutorial](/tutorials/#dialogflow-part-2-adding-call-transfer-functionality) for a detailed example.

<p class="flex">
<a href="/docs/webhooks/dial">Prev: dial</a>
<a href="/docs/webhooks/dtmf">Next: dtmf</a>
</p>
