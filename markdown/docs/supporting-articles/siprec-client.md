# Call Recording using SIPREC

jambonz can integrate with external recording platforms using [SIPREC](https://datatracker.ietf.org/doc/html/draft-ietf-siprec-protocol).  In this scenario, jambonz acts as a SIPREC client and forks the audio streams to send to a configured SIPREC server.

This feature is enabled via the [config](/docs/webhooks/config) verb using the `record` property.  This property can be used to start, stop, pause or resume the recording.

```json
{
  "verb": "config",
  "record": {
    "action": "startCallRecording",
    "siprecServerURL": "sip:srs@recording.example.com"
  }
}
```

The available properties are as follows:

| option        | description | required  |
| ------------- |-------------| -----|
|action|"startCallRecording", "stopCallRecording", "pauseCallRecording", or "resumeCallRecording"|yes|
|siprecServerURL|sip uri for SIPREC server|required if action is "startCallRecording"|
|recordingID|user-supplied string to identify the recording|no|

