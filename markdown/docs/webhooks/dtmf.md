# dtmf

The `dtmf` verb generates a string of dtmf digit signals.  These are sent as RTP payloads using [RFC 2833](https://datatracker.ietf.org/doc/html/rfc2833).

```json
{
  "verb": "dtmf",
  "dtmf": "0276",
  "duration": 250
}
```

You can use the following options in the `dtmf` action:

| option        | description | required  |
| ------------- |-------------| -----|
| dtmf | a string containing a sequence of dtmf digits (0-9,*,#) | yes |
| duration | the length of each digit, in milliseconds,  Defaults to 500 | no |

<p class="flex">
<a href="/docs/webhooks/dialogflow">Prev: dialogflow</a>
<a href="/docs/webhooks/dub">Next: dub</a>
</p>
