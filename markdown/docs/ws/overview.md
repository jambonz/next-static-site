# Websocket API

The websocket API is functionally equivalent to the Webhook API; it is simply an alternative way for an application to interact with and drive jambonz call and message processing.  

The reason we created this alternative API is that there are some use cases - primarily those involving a lot of asynchronous interaction with jambonz - that can be done much easier over a single websocket connection than over a combination of HTTP webhooks and REST APIs.

When you create a jambonz application in the jambonz portal and you want to use the websocket API, simply provide a ws(s) URL for the calling webhook instead of an http(s) URL.  The call status webhook can be the same ws(s) URL, in which case your application will get the call status notifications over the same websocket connections.
> You can also have call status notifications sent to a completely separate http(s) webhook URL if you prefer.

The impact of specifying a ws(s) URL as the application calling webhook is that this causes jambonz to establish a websocket connection to that URL when an incoming call (or outbound call) is routed to the jambonz application, and then communicate with your application over that websocket connection. 

## Connection management

The websocket connection will be established by jambonz to the specified websocket URL,  The websocket subprotocol used shall be “ws.jambonz.org”.  If jambonz fails to connect to the provided URL, there will be no retry and the call shall be rejected.

Once connected, jambonz will send an initial JSON text message to the your server with the same parameters as are provided in the webhook call.  The full message set is described below, but for now we can simply say that:
- Only text frames are ever sent over the websocket connections; i.e. no binary frames.
- All text frames contain JSON-formatted data.
- The information content sent from jambonz to the your server is exactly the same content as that supplied via http webhooks.

The websocket should generally be closed only from the jambonz side, which happens when the call is ended.  If the your server closes the socket, jambonz will attempt to reconnect, up to a configurable number of reconnection attempts.  Upon reconnecting, jambonz will send an initial reconnect message containing only the callSid of the session.  It is up to the your server to maintain the state of the application between reconnections for the same call.

## Message format

As mentioned above, all messages will be JSON payloads sent as text frames.  The following top-level properties will be commonly included:
- *type*: all messages **must** have a type property.
  - Messages from jambonz to the your server will have the following types: [`session:new`, `session:reconnect`, `verb:hook`, `call:status`, `error`].
  - Messages from the your server to jambonz will have the following types: [`ack`, `command`].
- *msgid*: every message sent from jambonz will include a unique message identifier. Messages from the your server application that are responses to jambonz messages (`ack`) **must** include the msgId that they are acknowledging.  

Note that not all messages sent by jambonz need to be acknowledged.  The message types which **must** be acknowledged are the `session:new`, and `verb:hook` messages.

## Message types
In the sections that follow, we will describe each of the message types in detail.  The table below provides summary information.

|message type|sent by|usage|
|---|---|---|
|session:new|jambonz|sent when a new call arrives (or an outbound call generated via the  REST API has been answered).  This is analogous to the initial webhook sent by jambonz to gather an initial set of instructions for the call.|
|session:redirect|jambonz|sent when live call control has been used to retrieve a new application for either the parent or child call leg.|
|session:reconnect|jambonz|sent when the websocket connection was closed unexpectedly by the websocket server and jambonz has successfully reconnected.|
|call:status|jambonz|sent any time the call status changes.|
|verb:hook|jambonz| sent when an action hook or event hook configured for a verb has been triggered (e.g. a “gather” verb has collected an utterance from the user).|
|verb:status|jambonz|sent when a verb has just started or completed executing.  See “command” below; this message is only sent if the app includes “id” properties on the verbs provided.|
|jambonz:error|jambonz| if jambonz encounters some sort of fatal error (i.e. something that would necessitate ending the call unexpectedly) jambonz will send an error event to the far end app describing the problem.|
|ack|websocket server|the ws server will respond to any `session:new` or `verb:hook` message with an `ack` message indicating that the provided content in the message has been processed.  The ack message may optionally contain a payload of new instructions for jambonz.|
|command|websocket server|the ws server  will send this message when it wants to asynchronously  provide a new set of instructions to jambonz. The app **may** include an `id` property in each of the verbs included in the command; if so, jambonz will send `verb:status` notifications back to the app when the verb is executed.  The `id` property is a string value that is assigned by the app and is meaningful only to the app (i.e. to jambonz it is simply an opaque piece of tracking data).|


<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/session-new">Next: session:new</a>
</p>
