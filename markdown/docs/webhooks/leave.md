# leave

The `leave` verb transfers a call out of a queue.  The call then returns to the flow of execution following the [enqueue](#enqueue) verb that parked the call, or the document returned by that verbs *actionHook* property, if provided.

```json
{
  "verb": "leave"
}
```

There are no options for the `leave` verb.

<p>
<a href="/docs/webhooks/hangup" style="float: left;">Prev: hangup</a>
<a href="/docs/webhooks/lex" style="float: right;">Next: lex</a>
</p>
