# redirect

The redirect action is used to transfer control to another JSON document that is retrieved from the specified url.  All actions after `redirect` are unreachable and ignored.

```json
{
  "verb": "redirect",
  "actionHook": "/connectToSales",
}
```

You can use the following options in the `redirect` action:

| option        | description | required  |
| ------------- |-------------| -----|
| actionHook | URL of webhook to retrieve new application from.  | yes |

<p>
<a href="/docs/webhooks/play" style="float: left;">Prev: play</a>
<a href="/docs/webhooks/say" style="float: right;">Next: say</a>
</p>
