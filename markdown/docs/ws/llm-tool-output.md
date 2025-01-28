# llm:tool-output

>> websocket server => jambonz

An `llm:tool-output` message is sent by the application to jambonz in response to a [llm:tool-call](docs/ws/llm-tool-call/)) message.

The payload must include:
- tool_call_id: the value of call_id in the "llm:tool-call" message
- data: an object containing the results of the function

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/overview">Prev: overview</a>
<a href="/docs/ws/session-redirect">Next: session:redirect</a>
</p>
