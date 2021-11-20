# sip:refer
> Coming in v0.6.7

The sip:refer action is used to blind transfer a call.  It will send a sip REFER to the far end carrier or sip phone, which must support the REFER in order for the transfer to work. After the sip:refer completes successfully, the call leg will have left the jambonz platform.

```json
{
  "verb": "sip:refer",
  "referTo": +15083084809,
  "actionHook": "/action"
}
```

You can use the following options in the `sip:refer` action:

| option        | description | required  |
| ------------- |-------------| -----|
| referTo | a sip uri or a phone number / user identifier | yes |
| referredBy | a sip uri or a phone number / user identifier; if not provided it will default to the identity of the party being transferred | no |
| actionHook | a webhook to call when the transfer has completed | no |
| eventHook | a webhook to call when NOTIFY messages of follow-on call status are received | no |
| headers | additional SIP headers to include in the response | no

The sip:refer verb completes when one of these conditions are met:
- a failure response is received to the REFER
- a 202 Accepted is received in response to the REFER, and a NOTIFY of the follow-on call status with a final call status is received.

The sip:refer has an action hook that will provide details of the final result, as well as an event hook that is called for every NOTIFY received after a successful REFER.

The *actionHook* webhook will contain the following additional parameters:

- `referStatus`: the sip status response to the REFER request
- `final_referred_call_status` - the final sip status of the subsequent call to the transferee.  This is only provided in the case where the REFER is accepted and NOTIFY requests are received from the far end.

The *eventHook* webhook will contain two parameters: `event` and `call_status`.  The `event` parameter will always be `transfer-status` and the `call-status` will contain a sip status received in a NOTIFY after a successful REFER; e.g.
```json
{
	"event": "transfer-status",
	"call_status": "180"
}
```

<p class="flex">
<a href="/docs/webhooks/sip-decline">Prev: sip:decline</a>
<a href="/docs/webhooks/tag">Next: tag</a>
</p>
