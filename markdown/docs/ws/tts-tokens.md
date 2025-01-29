# tts:tokens

>> websocket server => jambonz

An `tts:tokens` message is sent by the application to jambonz to stream text to a speech synthesizer.  This requires that a TTS speech vendor that supports streaming is being used for the call.  Currrently, as of release 0.9.3 the following vendors are support for TTS streaming:

- Cartesia
- Deepgram
- Elevenlabs

The payload must contain:
- id: a unique identifier within the current tts stream, identifying this request
- tokens: a string of text to be synthesized in streaming fashion

The intent is that as the application receives a stream of tokens from an LLM that is being managed by the application it will send this stream on via successive calls to tts:tokens.

The application will receive a [tts:tokens-result](docs/ws/tts-tokens-result) message in response to each tts:tokens message it sends.  

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/overview">Prev: overview</a>
<a href="/docs/ws/session-redirect">Next: session:redirect</a>
</p>
