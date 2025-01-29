# tts:tokens-result

>> jambonz => websocket server

An `tts:tokens-result` message is sent by jambonz in response to each [tts:tokens](docs/ws/tts-tokens) message received.

The message shall contain:

- id: the unique identifier from the tts:tokens message
- status: 'ok' if tokens were processed, 'failed' if not
- reason: only supplied it status is 'failed'; provides more detail on why the tokens were not processed

The most common reason for a 'failed' response is if the token buffer maintained by jambonz for this conversation is full.  In that case the reason will be 'full' and the application should stop sending any further tts:tokens messages until a [tts:streaming-event](docs/ws/tts-streaming-event) message is received indicating that streaming of TTS tokens can resume.


<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/overview">Prev: overview</a>
<a href="/docs/ws/session-redirect">Next: session:redirect</a>
</p>
