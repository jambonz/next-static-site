# Answering machine detection

The answering machine detection feature can be enabled on outbound calls to provide an indication of whether a call has been answered by a person or a machine.  This is done by providing an `amd` property in a `dial` verb as shown in the simple example below:

```json
{
  "verb": "dial",
  "actionHook": "/outdial",
  "callerId": "+16173331212",
  "target": [
    {
      "type": "phone",
      "number": "+15083084809",
      "trunk": "Twilio"
    }
  ],
  "amd": {
    "hook": "/amdEvents"
  }
}
```
> Note: answering machine detection can also be performed on an inbound leg by adding an `amd` property to a [config](/docs/webhooks/config) verb.  While it is less common to need to do answering machine detection on an inbound leg, this can be useful when jambonz is behind a dialer that has placed the outbound call and then connected it to jambonz by sending an INVITE to jambonz.

In this example, when the dialed call is answered the answering machine detection feature will begin listening on the outbound call leg and after a short period of time will send a webhook to '/amdEvents' with an indication of whether a human or a machine has answered the call.  The payload in the webhook will look something like this:

```json
{"type":"amd_human_detected"}
```
or
```json
{"type":"amd_machine_detected","reason":"hint","hint":"call has been forwarded","language":"en-us"}
```

If no speech is detected at all from the far end, the payload will look like this:
```json
{"type":"amd_no_speech_detected"}
```

And, finally, if the answering machine detection feature is unable to determine whether the remote party is a machine or human it will return
```json
{"type":"amd_decision_timeout"}
```

The application receiving the webhook can return a new jambonz payload of verbs.  For instance, say you had an outbound dialer application in which if you connect to a person you want to deliver a message, but if you connect to someone's voicemail you simply want to hang up.  In that case, your app can respond to the webhook with a simple [hangup](/docs/webhooks/hangup) verb if you receive an event payload indicating a machine has answered.

## How it works

### Length of greeting
The answering machine detection feature leverages the fact that voicemail greetings are typically quite a bit more lengthy than a human's greeting.  When the call is answered, speech recognition is used to determine the length of the greeting and if it is shorter than a (configurable) threshold, it is determined to be human; if longer then it is determined to be a machine.

### Key Voicemail phrases
Optionally, the feature can also given a list of common phrases that one might hear on a voicemail greeting.  If any of the phrases are detected then the determination is immediately made that this is a machine.  These phrases are supplied via an external file, so they can be easily updated as needed for a specific deployment.  As example, here are sample phrases that might be used for an english language greeting:

```json
{
  "en-US": [
    "call has been forwarded",
    "at the beep",
    "at the tone",
    "leave a message",
    "leave me a message",
    "not available right now",
    "not available to take your call",
    "can't take your call",
    "I will get back to you",
    "I'll get back to you",
    "we will get back to you",
    "we are unable",
    "we are not available"
  ]
}
```

### Beep detection
The feature also attempts to detect audio tones, or beeps that are commonly used on voicemail systems.  If detected, an event is sent via the actionHookf to the webapp.

### Determining when to leave a voicemail
For an application that wishes to leave a message on a voicemail system, it is necessary to know when the voicemail greeting has completed and the voicemail system is now ready to record the message.  If the feature determines that the remote party is a machine, it will continue listening to the greeting until it completes and then send an event via the `actionHook` to the application.  This can be used as a cue to let the application know that it is time to start leaving the message.

## Events
The payload that is included in the `actionHook` will always contain a `type` property describing the event type.  Some event types may also include additional properties.  These are described in the table below.

|type|meaning|additional properties|
|----|-------|---------------------|
|amd_human_detected|a human is speaking|{reason, greeting, language}<br> reason is 'short greeting', <br>greeting is the recognized greeting and <br>language is the recognized language|
|amd_machine_detected|a machine is speaking|{reason, hint, transcript, language}<br> reason is 'hint' or 'long greeting', <br>hint is the recognized hint<br>transcript is the recognized greeting and <br>language is the recognized language|
|amd_no_speech_detected|no speech was detected|none|
|amd_decision_timeout|no decision was able to be made in the time given|none|
|amd_machine_stopped_speaking|machine has completed the greeting|none|
|amd_tone_detected|a beep was detected|none|
|amd_error|an error has occurred|error - an error message|
|amd_stopped|answering machine detection was stopped|none|

It is possible to receive more than one event for a single call.  For instance, a possible sequence of events on a call to an answering machine is:

1. amd_machine_detected, then
1. amd_tone_detected, then
1. amd_machine_stopped_speaking

## Configuration

The full set of configuration parameters is shown below.

|property|meaning|required?|
|--------|-------|---------|
|actionHook|webhook to send amd events|yes|
|thresholdWordCount|number of spoken words in a greeting that result in an amd_machine_detected result|no, default=9|
|recognizer|speech recognition parameters, used as per [gather](/docs/webhooks/gather) and [transcribe](/docs/webhooks/transcribe)|no, default=app defaults|
|timers|object containing various timeouts|no|
|timers.noSpeechTimeoutMs|time in milliseconds to wait for speech before returning amd_no_speech_detected|no, default=5000|
|timers.decisionTimeoutMs|time in milliseconds to wait before returning amd_decision_timeout|no, default=15000|
|timers.toneTimeoutMs|time in milliseconds to wait to hear a tone|no, default=20000|
|timers.greetingCompletionTimeoutMs|silence in milliseconds to wait for during greeting before returning amd_machine_stopped_speaking|no, default=2000|

### Voicemail phrases

If desired, a JSON file of voicemail phrases, organized by language as shown above can be supplied.  If provided, the environment variable `VMD_HINTS_FILE` should point to the file path to this file.
