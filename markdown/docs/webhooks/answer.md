# answer

The `answer` verb answers an incoming call by sending a SIP 200 OK.
```json
  {
    "verb": "answer",
  },
```

> Note: it is not usually necessary to use the `answer` verb, as jambonz will automatically encounters the first verb that requires a media connection.  For instance, if your application starts with a `say` verb, then jambonz will automatically answer the call when it begins executing the `say` verb.  The `answer` verb is provided as a convenience for cases where you might want to, for example, answer the call and then pause (play silence) for a second or two while you backend system formulates an application.

There are no attributes in the `answer` command.


<p class="flex">
<a href="/docs/webhooks/overview">Prev: Overview</a>
<a href="/docs/webhooks/conference">Next: conference</a>
</p>
