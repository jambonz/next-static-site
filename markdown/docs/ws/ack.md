# ack

>> websocket server => jambonz

An `ack` message is sent by the websocket server to jambonz in response to a `session:new` or `verb:hook` message.  The ack message may optionally contain a payload of new instructions for jambonz to execute.

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "ack"|indicates this is an ack message|yes|
|msgid|string|references the message this is in reply to|yes|
|data|array|array of jambonz verbs to execute|no|

```json
{
  "type": "ack",
  "msgid": "1cvh3MNHh1xrJaHmnitqA1",
  "data": [
    {
      "text": "Hi there and welcome!",
      "verb": "say"
    }
  ]
}
```

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/jambonz-error">Prev: jambonz:error</a>
<a href="/docs/ws/command">Next: command</a>
</p>
