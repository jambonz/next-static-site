# call:status

>> jambonz => websocket server

A `call:status` message is sent by jambonz to the websocket server any time the call status changes

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "call:status"|indicates this is an error notification from jambonz|yes|
|msgid|string|unique message identifier|yes|
|call_sid|string|unique call identifier|yes|
|b3|string|open telemetry span identifier for this call (only provided if otel tracing is enabled)|no|
|data|object|current call information|yes|
|data.call_status|string|one of 'trying', 'ringing', 'early-media', 'in-progress', 'completed', 'failed', 'no-answer', 'busy', 'queued'|yes|

```json
{
  "type": "call:status",
  "msgid": "eyvooFN3dRMpZ2ZxdRLvBm",
  "call_sid": "b5e39996-bd2f-4bda-b928-355147186a2a",
  "b3": "e72ef0d61bfb3e23c5e50c72496feb2e-6125806ded19bb18-1",
  "data": {
    "call_sid": "b5e39996-bd2f-4bda-b928-355147186a2a",
    "direction": "inbound",
    "from": "+441173185201",
    "to": "+441303763875",
    "call_id": "7ade3efb-7163-123b-e6ba-023fd61c5256",
    "sip_status": 200,
    "sip_reason": "OK",
    "call_status": "completed",
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
<a href="/docs/ws/session-reconnect">Prev: session:reconnect</a>
<a href="/docs/ws/verb-hook">Next: verb:hook</a>
</p>
