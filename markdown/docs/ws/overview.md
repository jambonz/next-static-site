# Websocket API

>> Note: this page describes how to build applications using websockets.  If you prefer to use the webhooks API, please visit [this page](/docs/webhooks/overview).

**TLDR;**
- Use `npx create-jambonz-ws-app` to scaffold a webhook application
- See [@jambonz/node-client-ws](https://www.npmjs.com/package/@jambonz/node-client-ws) for Node.js API

The websocket API is functionally equivalent to the Webhook API; it is simply an alternative way for an application to interact with and drive jambonz call and message processing.  We recommend using the websocket API for highly asynchronous applications.

When you create a jambonz application in the jambonz portal and you want to use the websocket API, simply provide a ws(s) URL for the calling webhook instead of an http(s) URL.  The call status webhook can be the same ws(s) URL, in which case your application will get the call status notifications over the same websocket connections.
> You can also have call status notifications sent to a completely separate http(s) webhook URL if you prefer.

The impact of specifying a ws(s) URL as the application calling webhook is that this causes jambonz to establish a websocket connection to that URL when an incoming call (or outbound call) is routed to the jambonz application, and then communicate with your application over that websocket connection. 

>> In the documentation below, we refer to the websocket server as the "application".

## Connection management

The websocket connection will be established by jambonz to the specified websocket URL,  The websocket subprotocol used shall be “ws.jambonz.org”.  If jambonz fails to connect to the provided URL, there will be no retry and the call shall be rejected.

Once connected, jambonz will send an initial JSON text message to the your application with the same parameters as are provided in the webhook call.  The full message set is described below, but for now we can simply say that:
- Only text frames are ever sent over the websocket connections; i.e. no binary frames.
- All text frames contain JSON-formatted data.
- The information content sent from jambonz to the your application is exactly the same content as that supplied via http webhooks.

The websocket should generally be closed only from the jambonz side, which happens when the call is ended.  If the your application closes the socket, jambonz will attempt to reconnect, up to a configurable number of reconnection attempts.  Upon reconnecting, jambonz will send an initial reconnect message containing only the callSid of the session.  It is up to the your application to maintain the state of the application between reconnections for the same call.

## Message format

As mentioned above, all messages will be JSON payloads sent as text frames.  The following top-level properties will be commonly included:
- *type*: all messages **must** have a type property.
  - Messages from jambonz to the your application will have the following types: [`session:new`, `session:reconnect`, `verb:hook`, `call:status`, `error`].
  - Messages from the your application to jambonz will have the following types: [`ack`, `command`].
- *msgid*: every message sent from jambonz will include a unique message identifier. Messages from the your application application that are responses to jambonz messages (`ack`) **must** include the msgId that they are acknowledging.  

Note that not all messages sent by jambonz need to be acknowledged.  The message types which **must** be acknowledged are the `session:new`, and `verb:hook` messages.

## Message types
In the sections that follow, we will describe each of the message types in detail.  The tables below provides summary information for:

- client messages (sent from jambonz to your application) and,
- server messages (sent from your application to jambonz).

### Client messages
The following messages are sent by jambonz to your application

|type|usage|
|---|---|
|session:new|sent when a new call arrives (or an outbound call generated via the  REST API has been answered).  This is analogous to the initial webhook sent by jambonz to gather an initial set of instructions for the call.|
|session:redirect|sent when live call control has been used to retrieve a new application for either the parent or child call leg.|
|session:reconnect|sent when the websocket connection was closed unexpectedly by the application and jambonz has successfully reconnected.|
|call:status|sent any time the call status changes.|
|verb:hook|sent when an action hook or event hook configured for a verb has been triggered (e.g. a “gather” verb has collected an utterance from the user).|
|verb:status|sent when a verb has just started or completed executing.  See “command” below; this message is only sent if the application includes “id” properties on the verbs provided.|
|llm:event|sent when an LLM generates any kind of event; e.g. transcript, etc|
|llm:tool-call|sent when an LLM agent makes a tool or function call that the application needs to invoke|
|tts:tokens-result|sent in response to a `tts:tokens` message to indicate whether the tokens have been processed. The payload may indicate that the tokens were not processed due to a throttling limit, in which case the application is expected to queue the tokens and retry later (after a `tts:tokens` message is received indicating the stream has been resumed)|
|tts:streaming-event|sent to notify an application that a tts stream has been paused or resumed due to throttling limits|
|dial:confirm|sent when a dialed call has a confirmHook; the application should respond with a payload of verbs to play in the confirm call session|
|jambonz:error|if jambonz encounters some sort of fatal error (i.e. something that would necessitate ending the call unexpectedly) jambonz will send an error event to the far end application describing the problem.|

### Server messages
The following messages can be sent from your application back to jambonz

|type|usage|
|---|---|
|ack|the jambonz application must respond to any `session:new` or `verb:hook` message with an `ack` message indicating that the provided content in the message has been processed.  The ack message may optionally contain a payload of new instructions for jambonz.|
|command|the application  will send this message when it wants to asynchronously  provide a new set of instructions to jambonz. The application **may** include an `id` property in each of the verbs included in the command; if so, jambonz will send `verb:status` notifications back to the application when the verb is executed.  The `id` property is a string value that is assigned by the application and is meaningful only to the application (i.e. to jambonz it is simply an opaque piece of tracking data).|
|llm:tool-output|the application should send this when an LLM has invoked a tool and results are available|
|llm:update|the apps sends when it wants to asynchronously provide new instructions or session state to the LLM|
|tts:tokens|sent when the application wants to stream text, e.g. from an LLM being managed on the application side.  This may be called multiple times as the LLM itself streams tokens|
|tts:flush|sent periodically during TTS streaming when the application wants to cause audio to be generated|
|tts:clear|sent during TTS streaming when the application wants to discard any queued audio and tokens, e.g. to handle an interruption|



<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/session-new">Next: session:new</a>
</p>
