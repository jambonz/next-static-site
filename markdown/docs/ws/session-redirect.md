# session:redirect

>> jambonz => websocket server

A `session:redirect` message is sent by jambonz to the websocket server when a call has been redirected to a new application and a relative URL was provided instead of an array of verbs.

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "session:redirect"|indicates this is a session:redirect message|yes|
|msgid|string|unique message identifier|yes|
|call_sid|string|unique call identifier|yes|
|b3|string|open telemetry span identifier for this call (only provided if otel tracing is enabled)|no|
|hook|string|url of the call_hook that was provided|yes|
|data|object|JSON payload describing the current state of the call|yes|

```json
{
  "type": "session:redirect",
  "msgid": "cvY6kNE8RXdaZdaDcJbViG",
  "call_sid": "aad0115d-ec21-40db-aa02-31b7b01540c5",
  "b3": "18228daa536f82e0ec29074e7bf47b89-dd3bdf1f177f2995-1",
  "hook": "survey",
  "data": {
    "call_sid": "b5e39996-bd2f-4bda-b928-355147186a2a",
    "direction": "inbound",
    "from": "+441173185201",
    "to": "+441303763875",
    "call_id": "7ade3efb-7163-123b-e6ba-023fd61c5256",
    "sip_status": 200,
    "sip_reason": "OK",
    "call_status": "in-progress",
    "account_sid": "300be250-5a79-46bd-8393-45e7d26c2e34",
    "trace_id": "654c5323d6f907233a1069136b8a330e",
    "local_sip_address": "10.0.150.88:5070",
    "defaults": {
      "synthesizer": {
        "vendor": "microsoft",
        "language": "en-US",
        "voice": "en-US-JennyNeural"
      },
      "recognizer": {
        "vendor": "microsoft",
        "language": "en-US"
      }
    }
  }
}
```

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/session-new">Prev: session:new</a>
<a href="/docs/ws/session-reconnect">Next: session:reconnect</a>
</p>
