An increasingly common use case is to want to stream text tokens from an LLM and have jambonz play them out in realtime or as close to realtime as possible.  Currently, jambonz supports text-to-speech using either the `say` verb or the bidirectional `listen` verb and neither quite meets this need.  

The "say" verb is synchronous, in the sense that you have to feed it a full, standalone piece of text and while the "listen" verb handles bidirectional audio it can be somewhat complicated to synchronize that playout stream with the other verbs that your app might be sending over the application webhook/websocket connection.

This article contains a proposal for supporting TTS streaming from LLMs over the application websocket, making it easier and more natural to implement in jambonz applications.  

> Note: Use of the [websocket api](https://www.jambonz.org/docs/ws/overview/) is required to access this feature; given the asynchronous nature of the use case it is not possible to easily support using webhooks.

# Proposed changes
We will break down the changes as follows:
- Changes to the `say` verb
- Changes to the websocket api

We will then also show proposed changes to the [node-client-ws](https://github.com/jambonz/node-client-ws) library to support this, and examine what a sample application written to take advantage of tts streaming will look like.

## Proposed changes to the "say" verb
We propose to make very simple changes to the "say" verb:

- Instead of providing the `text` property you can alternatively provide a `stream` property with value "true".
- Additionally, when doing so you can optionally provide a `closeOnStreamEmpty` property which, when set to true, will cause the `say` verb to end if all streamed tokens have been played out and the token input buffer is empty.  The default value of this property shall be true.

For example, in a `gather` with a nested say you could simply do:

```js
    session
      .gather({
        say: {stream: true},
        input: ['speech'],
        actionHook: '/echo',
        timeout: 15,
      })
```
This can be either a gather that is running in the foreground or in the background.

When a `say` with streaming enabled is used, as in the above example; the audio will be provided from the application as a series of commands over the websocket.  The text tokens provided will then be streamed using the configured TTS vendor.

> Note: use of this feature requires selection of a TTS vendor that supports streaming.  The initial vendors we intend to support and test with include Deepgram and PlayHT.

The behavior of the `say` verb when using the `stream` property will generally be unchanged, other than the fact that tts streaming is used.  In particular, your app can still expect that:
- If the user barges in by speaking the audio will be killed.
- Your app can receive a `verb:status` message over the websocket with "speech-bargein-detected" when the user barges in.
- The say verb will end when the audio completes playing out.
- If the say verb is killed the audio will be stopped.

We do not see any other changes needed to the jambonz verbs to support this feature, and we regard it as a value to keep things simple like this in terms of the changes for application developers.

## Proposed changes to the websocket api
The changes to the websocket api will involve some new messages sent by jambonz to the application and some new messages sent by the application to jambonz

### jambonz -> application
One new message type will be sent from jambonz to the application: `tts:streaming-event`.

|message type|sent by|usage|
|---|---|---|
|tts:streaming-event|jambonz|will include an `event_type` property as described below|

The message will include one of the following event_types:
- `stream_open`: any text tokens sent from this time on will be immediately processed and played out
- `stream_closed`: any text tokens sent from this time on will be queued for processing once the stream is open again
- `stream_paused`: if the application has provided too many tokens, jambonz will ask the application to throttle by sending this event.  
- `stream_resumed`: if the stream has been paused per above, after enough queued tokens have been processed this event will be sent to indicate that the application may again send tokens.
- `stream_error`: reports a processing error of some kind to the application.
- `audio_playback_start`: the first byte of audio received from the TTS vendor has been played out.  This event will follow the `stream_open` event and will be sent once only after that preceeding event to notify the application that the user is now hearing the audio.
- `audio_playback_done`: while the stream is open this event will be sent if all received and queued text tokens have been played out.
- `user_bargein`: the user has barged in and the audio playback has been stopped and any queued audio has been flushed.

The meaning of stream_open and stream_closed deserve a bit more of an explanation.

When an application first starts, it may begin sending text tokens at any time.  However, if jambonz is not currently executing a `say` verb those tokens will be queued.  When jambonz navigates to a `say` verb using the `stream` property, then a `stream_open` event type will be sent to the application (and any queued text tokens will be processed).  When a `say` verb ends, the `stream_closed` event type will be sent, indicating that any text tokens received at this point will be queued until another streaming `say` is executed.

When jambonz sends an event_type of `stream_open` it will include a property indicating the number of queued words that is is now processing, if any.

This notion of "stream" refers conceptually to the stream between the application and jambonz, it does not mean for instance that we will be connecting and disconnecting from the TTS provider during a call session.  Rather, when jambonz first executes a `say` with `stream` it shall connect to the TTS provider and it maintain that connection to the TTS provider for the remainder of the call.

### application -> jambonz
The websocket server application may send the following new messages to jambonz:

|message type|sent by|usage|
|---|---|---|
|tts:tokens|application|text tokens that should be played out, see below for additional properties|
|tts:flush|application|a command to tell jambonz to kill the audio as well as any queued tokens|

The application can send text tokens at any time to jambonz using the new `tts:tokens` command.  The payload shall include a `tokens` property containing the text to stream.  

Additionally, the payload must include an `id` property that uniquely identifies this particular set of tokens.  The id may be a number or a string.  This id will be returned to the application in the `last_processed_id` property of a `stream_paused` or `stream_resumed` event sent by jambonz so that the application is able to synchronize the pause/resume of a token stream when necessary.

```js
{
   type: "tts:tokens",
   id: 100
   tokens: "It was the year 1500, an important time for Portugual,"
}
```

> Note that you can not specify a tts vendor, language or voice in the `tts:tokens` command.  That is still done in the same way as before; using either application defaults or overriding with `say.synthesizer`.

## Proposed changes to the npm client

The `session` class will have the following new methods:
- `sendTextTokens`: used to send a `tts:tokens` message.  This can be used at any time to asynchronously send text tokens for tts streaming.
- `flushTextTokens`: used to send a `tts:flush` message, also can be sent asynchronously.

and the `session` class will emit the following new events:
- `tts:stream_open`
- `tts:stream_closed`
- `tts:stream_paused`
- `tts:stream_resumed`
- `tts:stream_error`
- `tts:audio_playback_start`
- `tts:audio_playback_done`
- `tts:user_bargein`

These events will have the meaning described above.

## Example use cases

A good way to implement LLM integration would be to have an app that does a background gather with a nested say using the `stream` property.  As the LLM streams text tokens you simply pipe them on to jambonz using the `tts:tokens` message type.  If you get an indication that the caller barged in via the `user_bargein` message type, you accordingly tell the LLM to cancel processing.  When you receive the next user transcript you then reengage the LLM, send a completion request and begin streaming text tokens again.
