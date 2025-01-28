# tts:streaming-event

>> jambonz => websocket server

An `tts:streaming-event` message is sent by jambonz to indicate a streaming event

The message shall contain an event_type field with one of the following values:

- stream_open: tokens are now being streamed to the synthesizer; any tokens received before this event would have been queued and are now being sent
- stream_closed: tokens are no longer being streamed to the synthesizer, but the application may continue sending them; when the stream is next opened the queued tokens will be sent.
- stream_paused: the token buffer is full and the application should discontinue sending tokens
- stream_resumed: the application may resume sending tokens

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/overview">Prev: overview</a>
<a href="/docs/ws/session-redirect">Next: session:redirect</a>
</p>
