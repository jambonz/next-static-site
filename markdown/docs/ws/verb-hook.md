# verb:hook

>> jambonz => websocket server

A `verb:hook` message is sent by jambonz to the websocket server when an action hook or event hook configured for a verb has been triggered (e.g. a “gather” verb has collected an utterance from the user).

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "verb:hook"|indicates this is an error notification from jambonz|yes|
|msgid|string|unique message identifier|yes|
|call_sid|string|unique call identifier|yes|
|b3|string|open telemetry span identifier for this call (only provided if otel tracing is enabled)|no|
|hook|string|url of hook that was providing in the eventHook or actionHook property|yes|
|data|object|data payload describing the event|yes|

```json
{
  "type": "verb:hook",
  "msgid": "cvY6kNE8RXdaZdaDcJbViG",
  "call_sid": "aad0115d-ec21-40db-aa02-31b7b01540c5",
  "b3": "18228daa536f82e0ec29074e7bf47b89-dd3bdf1f177f2995-1",
  "hook": "voice",
  "data": {
    "speech": {
      "is_final": true,
      "transcripts": [
        {
          "is_final": true,
          "language_code": "en-US",
          "alternatives": [
            {
              "confidence": 0.91916794,
              "transcript": "I'd like to book a car"
            }
          ]
        }
      ]
    },
    "reason": "speechDetected",
    "call_sid": "aad0115d-ec21-40db-aa02-31b7b01540c5",
    "direction": "inbound",
    "from": "+15083084809",
    "to": "+15083728363",
    "call_id": "fc5f8190-718a-123b-e6ba-023fd61c5256",
    "sip_status": 200,
    "sip_reason": "OK",
    "call_status": "in-progress",
    "account_sid": "4bfe85c1-96bb-4af7-ac83-68fe7ebd562d",
    "trace_id": "18228daa536f82e0ec29074e7bf47b89",
    "application_sid": "3badbf0f-e778-44bb-a89a-dc2ca31f2f9c",
    "fs_sip_address": "10.0.150.88:5070",
    "originating_sip_ip": "54.172.60.1",
    "originating_sip_trunk_name": "Twilio - Dave trunk",
    "api_base_url": "http://3.71.131.50/v1"
  }
}
```

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/call-status">Prev: call:status</a>
<a href="/docs/ws/verb-status">Next: verb:status</a>
</p>
