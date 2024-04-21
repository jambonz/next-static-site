# Bidirectional (streaming) audio

As of release 0.9.0, the jambonz [listen](/docs/webhooks/listen) verb supports streaming bidirectional audio.

>> Prior to release 0.9.0 bidirectional audio was supported but streaming was one-way: from jambonz to your application.  Any audio you provided back had to be provided in the form of a base64-encoded file that was received and then played in its entirety.

To enable bidirectional audio, you must explicitly enable it in the listen verb with the `streaming` property as shown below:
```js
{
  verb: 'listen',
  bdirectionalAudio: {
    enabled: true,
    streaming: true,
    sampleRate: 8000
  }
}
```

Your application should then send binary frames of linear-16 pcm raw data with the specified sample rate over the websocket connection.

