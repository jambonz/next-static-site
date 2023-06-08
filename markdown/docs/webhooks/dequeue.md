# dequeue
The `dequeue` verb removes the lowest priority call from a specified queue and bridges that call to the current caller.  

Note that (as of release 0.8.3-4) calls can optionally be [enqueued](/docs/webhooks/enqueue) with priority values that will dictate how they are ordered in the queue.  If priorities are not specified then the queue will operate in FIFO order.

```json
{
  "verb": "dequeue",
  "name": "support",
  "beep": true,
  "timeout": 60
}
```

You can use the following options in the `dequeue` command:

| option        | description | required  |
| ------------- |-------------| -----|
| name | name of the queue | yes |
| callSid | a specific call to dequeue; if not provided the lowest priority call or the call at the head of the queue will be dequeued | no|
| actionHook | A webhook invoke when call ends. If no webhook is provided, execution will continue with the next verb in the current application. <br/>See below for specified request parameters.| no |
| beep | if true, play a beep tone to this caller only just prior to connecting the queued call; this provides an auditory cue that the call is now connected | no |
| timeout | number of seconds to wait on an empty queue before returning (default: wait forever) | no |

<!--
| confirmHook | A webhook for an application to run on the callee's end before the call is bridged.  This will allow the application to play an informative message to a caller as they leave the queue (e.g. "your call may be recorded") | no |
-->

The *actionHook* webhook will contain a `dequeueResult` property indicating the completion reason:

- 'hangup' - the bridged call was abandoned while listening to the confirmHook message
- 'complete' - the call was successfully bridged and ended with a caller hangup
- 'timeout' - no call appeared in the named queue during the timeout interval
- 'error' - a system error of some kind occurred

<p class="flex">
<a href="/docs/webhooks/config">Prev: config</a>
<a href="/docs/webhooks/dial">Next: dial</a>
</p>
