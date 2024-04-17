# verb:status

>> jambonz => websocket server

A `verb:status` message is sent by jambonz to the websocket server when a verb has just started or completed executing.  

> Note: The `notifyEvents` attribute of the session config defaults to `false`. This must be set to `true` in order for `verb:status` messages to be enabled, and they will only be sent where the app has provided an `id` property on verbs it includes in a `command` message.

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "verb:status"|indicates this is an error notification from jambonz|yes|
|msgid|string|unique message identifier|yes|
|call_sid|string|unique call identifier|yes|
|b3|string|open telemetry span identifier for this call (only provided if otel tracing is enabled)|no|
|data|object|error details|yes|
|data.id|string|verb id|yes|
|data.verb|string|name of verb|yes|
|data.status|string|'begin' or 'end'|yes|

```json
{
  "type": "verb:status",
  "msgid": "1cvh3MNHh1xrJaHmnitqA1",
  "call_sid": "9fb35c28-9688-4531-943c-e280b04f3adf",
  "data": {
    "id": "ueydf3",
    "verb": "say",
    "status": "begin"
  }
}
```


<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/verb-hook">Prev: verb:hook</a>
<a href="/docs/ws/jambonz-error">Next: jambonz:error</a>
</p>
