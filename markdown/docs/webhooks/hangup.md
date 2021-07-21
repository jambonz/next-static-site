# hangup

The hangup command terminates the call and ends the application.
```json
{
  "verb": "hangup",
  "headers": {
    "X-Reason" : "maximum call duration exceeded"
  }
}
```

You can use the following options in the `hangup` action:

| option        | description | required  |
| ------------- |-------------| -----|
| headers | an object containing SIP headers to include in the BYE request | no |

<p>
<a href="/docs/webhooks/gather" style="float: left;">Prev: gather</a>
<a href="/docs/webhooks/leave" style="float: right;">Next: leave</a>
</p>
