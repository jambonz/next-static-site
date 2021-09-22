# rasa
> New in v0.6.6
The `rasa` verb is used to connect a call to a [Rasa](https://rasa.com/) assistant.

```json
{
  "verb": "rasa",
  "url": "http://my-assitant.acme.com/webhooks/rest/webhook?token=foobarbazzle",
  "prompt": "Hello there!  What can I do for you today?",
  "eventHook": "/rasa/event",
  "actionHook": "/rasa/action"
}
```

You can use the following options in the `rasa` verb:

| option        | description | required  |
| ------------- |-------------| -----|
| url | URL to connect to the Rasa assistant using the [RestInput](https://rasa.com/docs/rasa/connectors/your-own-website) channel | yes |
| prompt | an initial greeting to play to the user | no |
| eventHook | a webhook that is called when the rasa assistant returns either a user message or a bot message | no |
| actionHook | A webhook that is called when the rasa verb completes | no |
| tts | if provided, audio prompts will be played using these text-to-speech choices rather than the application defaults | no |
| tts.vendor | speech vendor to use: Google, aws (alias: polly), or default (for application default) | no |
| tts.language | language code to use.  | yes |
| tts.gender | (Google only) MALE, FEMALE, or NEUTRAL.  | no |
| recognizer | if provided, the speech recognition settings to use (defaults to application settings) | no |
| tts.voice | voice to use.  Note that the voice list differs whether you are using aws or Google. Defaults to application setting, if provided. | no |
| recognizer.hints | array of words or phrases to assist speech detection | no |
| recognizer.language | language code to use for speech detection.  Defaults to the application level setting, or 'en-US' if not set | no |
| recognizer.profanityFilter | if true, filter profanity from speech transcription.  Default:  no| no |
| recognizer.vendor | speech vendor to use (currently only Google supported) | no |

The rasa verb performs speech recognition on the caller audio stream and sends it as text input to the rasa assistant using the rasa [RestInput](https://rasa.com/docs/rasa/connectors/your-own-website) channel.  Text returned from the assistant is played to the caller using text-to-speech.  As the conversation proceeds, webhook events can be sent to notify of all of the messages being exchanged between the user and the bot, allowing your application to intercede at any point, e.g. to transfer the call to an agent.

The *actionHook* webhook will contain the following additional parameters:

- `rasaResult`: the completion reason:
    - `caller hungup` - the caller hungup
    - `redirect` - a new application was returned from an event webhook and is now being executed
    - `timeout` - the user did not respond to a prompt
    - `webhookError` - an error was received attempting to call an event webhook

The *eventHook* webhook will contain two parameters: `event` and `message`.  The `event` parameter will be either `userMessage` or `botMessage` depending on whether the message comes from the user or the rasa assistant, and `message` will contain the message itself.  Your event webhook may return a new application in a json payload, in which case the call will be redirected to that application.

<p class="flex">
<a href="/docs/webhooks/play">Prev: play</a>
<a href="/docs/webhooks/redirect">Next: redirect</a>
</p>
