# Handling delays in bots

When the [gather verb](/docs/webhooks/gather) collects a user utterance and submits it to the jambonz webhook or websocket application for processing, there may be a noticeable delay depending on what the back-end logic needs to do.  

For instance, it may need to update a CRM system, make an http request, or feed an LLM and wait for a response etc.  Some of these operations may take a while to complete, and you want to be able to provide a user with some cue that this is normal system processing.

In addition to these normal delays, there could also be situations where the backend has failed in some unexpected way (e.g. crashed, gone offline, restarted) and in this case the user would be left listening to dead air.

For both of these cases, jambonz provides a way to pre-program instructions on what to say or play something when these sorts of delays are experienced.  This feature is enabled by the `actionHookDelayAction` property in either the gather or [config](/docs/webhooks/config) verbs. It is an object with the following properties:

| property      | description | required  |
| ------------- |-------------| -----|
| enabled | boolean; enable or disable the actionHookDelayAction feature | yes |
| noResponseTimeout | length of delay (in secs) which triggers an action | no (default: 0) |
| actions | array of actions (jambonz verbs) to take when noResponseTimeout is triggered | yes |
| retries | number of times to perform actions, with a noResponseTimeout between each retry | no (default: 1) |
| noResponseGiveUpTimeout | length of time (in secs) to give up and stop performing actions | no (default: none) |

## Examples
#### Providing filler noise

A simple use case is to provide filler noise when a back end operation takes a long time.  Here, if the response takes longer than two seconds we play some typing sounds to the caller.

```json
{
  "verb": "gather",
  "actionHook": "/processUserUtterance",
  "actionHookDelayAction" : {
    "enabled": true,
    "noResponseTimeout": 2,
    "actions": [
      {
        "verb": "play",
        "url": "http://adfads/typing-sounds.mp3"
      }
    ]
  }
}
```

#### Providing a series of prompts

A more complex use case would be to prompt multiple times as the delay gets longer, and then hang up the call if the bot does not respond in 20 seconds.

```json
{
  "verb": "config",
  "actionHookDelayAction" : {
    "enabled": true,
    "retries": 2,
    "noResponseTimeout": 5,
    "noResponseGiveupTimeout": 20,
    "actions": [
      {
        "verb": "say",
        "text": "Please hold while we complete your transaction"
      },
      {
        "verb": "say",
        "text": "Please continue to hold."
      }
    ]
  }
},
{
  "verb": "gather",
  "say": "Would you like us to book your flight now?",
  "input": ["speech"],
  "actionHook": "/processUserUtterance"
}
```

Note in the above that we have an array with two prompts.  The first is played after 5 seconds of delay and a different prompt is played if the user is still waiting for a response after 10 seconds.  If the delay reaches 20 seconds, then the call is terminated.