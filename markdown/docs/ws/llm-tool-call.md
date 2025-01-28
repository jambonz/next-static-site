# llm:tool-call

>> jambonz => websocket server

An `llm:tool-call` message is sent by jambonz to the application when an LLM being managed by jambonz (i.e., the [llm verb](docs/webhooks/llm/)) has called a function or tool that the application needs to implement.

The payload will include the following properties: 
- name: the name of the function,
- call_id: an identifier that must be returned in the `llm:tool-output` method sent by the application to return function call results, and
- args: an object containing the parameters provided as part of the function call

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/overview">Prev: overview</a>
<a href="/docs/ws/session-redirect">Next: session:redirect</a>
</p>
