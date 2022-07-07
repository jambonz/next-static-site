# sip:request
> Added in v0.7.6

The sip:request action is used to send a SIP INFO, NOTIFY, or MESSAGE request on an established call leg, i.e. an in-dialog request.  This allows an application to send arbitrary SIP messages during a call; e.g. to transmit metadata to the calling sip endpoint using a SIP INFO message.

```json
{
  "verb": "sip:request",
  "method": "INFO",
  "headers": {
    "X-Metadata": "my sip metadata"
  }
  "actionHook": "/info"
}
```

You can use the following options in the `sip:request` action:

| option        | description | required  |
| ------------- |-------------| -----|
| method |SIP method, should be one of INFO, MESSAGE, or NOTIFY| yes |
| headers | an object containing headers (key-value) to include with the SIP request | no |
| body | the body of the SIP request, if any | no |
| actionHook | a webhook to call when the sip request has completed | no |

The sip:request verb completes when a response is received from the far end.  The actionHook provides the status code of the sip response:

- `result`: 'success' or 'failed'
- `sipStatus`: sip status code of response
- `err`: error message, in the case of failure

<p class="flex">
<a href="/docs/webhooks/sip-refer">Prev: sip:refer</a>
<a href="/docs/webhooks/tag">Next: tag</a>
</p>
