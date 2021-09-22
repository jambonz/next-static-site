# message
> New in v0.6.6 (beta)
The `message` verb is used to send an SMS via a carrier using the [SMPP](https://smpp.org/) protocol.  It requires that you have added a BYOC carrier configured that supports SMS.

> You can also send SMS via the REST API.  [See here](https://api.jambonz.org/#54f1de57-3740-49f3-bd29-e68541d63dc3) for more details on that.

```json
{
  "verb": "message",
  "to": "15083084809",
  "from": "16173334567",
  "text": "Your one-time passcode is 1234",
  "actionHook": "/sms/action"
}
```

You can use the following options in the `message` verb:

| option        | description | required  |
| ------------- |-------------| -----|
| from | sending number | yes |
| to | destination number | yes |
| text | text message to send | yes |
| carrier | name of BYOC carrier to use (useful only when you have multiple carriers configured with SMPP support, otherwise leave out) | no |
| actionHook | A webhook that is called when the message verb completes | no |

<h5 id="message-action-properties">actionHook properties</h5>

The actionHook that is invoked when the `message` command completes will include the following properties:

| property name  | description | 
| ------------- |-------------|
| message_sid | the unique identifier for the message assigned by jambonz |
| message_status | the final status of the message attempt; will be one of:<ul><li>- success</li><li>- failure</li><li>- no carriers</li><li>- smpp configuration error, or</li><li>- system error</li></ul>|
| message_failure_reason | in the case of message_status 'failure', this will contain detail describing why the outbound smpp request failed|
| carrier | the name of the carrier selected to send the SMS|
| carrier_message_id | the message identifier assigned by the carrier for this SMS|

<p class="flex">
<a href="/docs/webhooks/listen">Prev: listen</a>
<a href="/docs/webhooks/pause">Next: pause</a>
</p>
