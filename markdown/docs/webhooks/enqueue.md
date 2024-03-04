# enqueue
The `enqueue` command is used to place a caller in a queue.

```json
{
	"verb": "enqueue",
	"name": "support",
	"actionHook": "/queue-action",
	"waitHook": "/queue-wait"
}
```

You can use the following options in the `enqueue` command:

| option        | description | required  |
| ------------- |-------------| -----|
| name | name of the queue | yes |
| priority | (added in 0.8.3-4) optional priority value between 0 and 999. Calls are dequeued in priority order, lowest to highest| no (default: 999)|
| actionHook | A webhook invoke when operation completes. <br/>If a call is dequeued through the `leave` verb, the webook is immediately invoked. <br/>If the call has been bridged to another party via the `dequeue` verb, then the webhook is invoked after both parties have disconnected. <br/>If no webhook is provided, execution will continue with the next verb in the current application. <br/>See below for specified request parameters.| no |
| waitHook | A webhook to invoke while the caller is in queue.  The only allowed verbs in the application returned from this webhook are `say`, `play`, `pause`, and `leave`, </br>See below for additional request parameters| no|

The *actionHook* webhook will contain the following additional parameters:

- `queueSid`: the unique identifier for the queue
- `queueResult`: the completion reason:
    - 'hangup' - the call was abandoned while in queue
    - 'leave' - a `leave` verb caused the call to exit the queue
    - 'bridged' - a `dequeue` verb caused the call to be bridged to another call
    - 'error' - a system error of some kind occurred
- `queueTime` - the number of seconds the call spent in queue
- `queueSize` - the number of calls remaining in queue
- `queuePosition` - the zero-based position of the call in queue before it was removed
- `callSid` - the unique identifier for the call
- `callId` - the sip Call-ID for the call

The *waitHook* webhook will contain the following additional parameters:

- `queueSid`: the unique identifier for the queue
- `queuePosition`: the current zero-based position in the queue
- `queueTime`: the current number of seconds the call has spent in queue
- `queueSize`: the current number of calls in the queue

You can also optionally receive [queue webhook notifications](/docs/webhooks/queue-notifications) any time a members joins or leaves a queue.

<p class="flex">
<a href="/docs/webhooks/dub">Prev: dub</a>
<a href="/docs/webhooks/gather">Next: gather</a>
</p>
