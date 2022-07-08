# jambonz:error

>> jambonz => websocket server

A `jambonz:error` message is sent by jambonz to the websocket server if jambonz encounters some sort of fatal error (i.e. something that would necessitate ending the call unexpectedly) jambonz will send an error event to the far end app describing the problem.

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "jambonz:error"|indicates this is an error notification from jambonz|yes|
|msgid|string|unique message identifier|yes|
|call_sid|string|unique call identifier|yes|
|b3|string|open telemetry span identifier for this call (only provided if otel tracing is enabled)|no|
|data|object|error details|yes|
|data.error|string|error message|yes|
|data.verb|string|name of the verb that generated the error|yes|

```json
{
  "type": "jambonz:error",
  "msgid": "1cvh3MNHh1xrJaHmnitqA1",
  "call_sid": "9fb35c28-9688-4531-943c-e280b04f3adf",
  "data": {
    "error": "Speech credentials not found",
    "verb": "say"
  }
}
```

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/verb-status">Prev: verb:status</a>
<a href="/docs/ws/ack">Next: ack</a>
</p>
