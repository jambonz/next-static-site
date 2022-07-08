# command

>> websocket server => jambonz

A `command` message is sent by the websocket server to jambonz when the server wants to asynchronously provide a new set of instructions to jambonz. 

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "command"|indicates this is a command message|yes|
|command|string|describes the action to take, see allowed commands below|yes|
|queueCommand|boolean|if true, queue this command until previous commands are completed; otherwise, interrupt and flush all previous commands and execute this command immediately|no|
|data|array|data pertaining to the requested command|yes|

The `command` property must be one of the values shown below.
> Note: `redirect` is the most commonly-used value.

|command value|meaning|data requirements|
|-------------|-------|-----------------|
|redirect|execute the application provided|data must be an array of jambonz verbs; i.e. a jambonz application.|
|call:status|change the call status (e.g. hangup the call)|data must include a `call_status` property with a value of 'completed' or 'no-answer'|
|mute:status|mute or unmute the call|data must include a `mute_status` property with a value of 'mute' or 'unmute'|
|conf:mute-status|mute or unmute all non-moderator conference legs|data must include a `conf_mute_status` property with a value of either 'mute' or 'unmute'|
|conf:hold-status|place a conference leg on hold or take off hold|data must include a `conf_hold_status` property with a value of either 'hold' or 'unhold'|
|listen:status|Change the status of a listen stream|data must include a `listen_status` property with a value of 'pause' or 'resume'|
|whisper|Play a whisper prompt to the caller (i.e only one party hears the prompt)|data must include a `whisper` property that can be an array of say or play verbs|
|sip:request|Send a SIP INFO, NOTIFY, or MESSAGE request to the far end party|data must include a 'method' property (allowed values: 'INFO', 'NOTIFY', 'MESSAGE') and can include 'content_type', 'content', and 'headers' properties.|


> Note: In the data payload when `redirect` is used, each jambonz verb in the `data` array may optionally include an `id` property.  If present, jambonz will provide `verb:status` notifications when the verb starts and ends execution.

```json
 {
  "type": "command",
  "command": "redirect",
  "queueCommand": true,
  "data": [
    {
      "say": {
        "id": "b5e39996",
        "text": "Hello it's me Mario"
      }
    }
  ]
}
```

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/ack">Prev: ack</a>
</p>
