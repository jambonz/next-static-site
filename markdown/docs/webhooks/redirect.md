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

<p class="flex">
<a href="/docs/webhooks/play">Prev: play</a>
<a href="/docs/webhooks/say">Next: say</a>
</p>
