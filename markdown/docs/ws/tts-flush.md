# tts:flush

>> websocket server => jambonz

An `tts:flush` message is sent by the application to jambonz to indicate that the speech synthesizer should be notified to generate audio for the tokens that have been sent.  The application should periodically call tts:flush.  

The snippet of example code below, written using [@jambonz/node-client-ws](https://www.npmjs.com/package/ws) shows how an application streaming tokens from Anthropic could call tts:flush at the end of each message streamed by Anthropic.

```js
    const stream = await client.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 1024,
      messages: session.locals.messages,
      stream: true
    });

    for await (const messageStreamEvent of stream) {
      if (messageStreamEvent.delta?.text) {
        const tokens = messageStreamEvent.delta.text;
        session.sendTtsTokens(tokens)
          .catch((err) => logger.error({err}, 'error sending TTS tokens'));
      }
      else if (messageStreamEvent.type === 'message_stop') {
        session.flushTtsTokens();
      }
    }

```


<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/overview">Prev: overview</a>
<a href="/docs/ws/session-redirect">Next: session:redirect</a>
</p>
