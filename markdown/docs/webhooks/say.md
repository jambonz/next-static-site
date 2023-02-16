# say

The say command is used to send synthesized speech to the remote party. The text provided may be either plain text or may use SSML tags.  The following vendors are supported: google, microsoft, aws, nuance, nvidia, ib, and wellsaid, 

```json
{
  "verb": "say",
  "text": "hi there!",
  "synthesizer" : {
    "vendor": "google",
    "language": "en-US"
  }
}
```

You can use the following options in the `say` action:

| option        | description | required  |
| ------------- |-------------| -----|
| text | text to speak; may contain SSML tags | yes |
| synthesizer.vendor | speech vendor to use| no |
| synthesizer.language | language code to use.  | no |
| synthesizer.gender | (Google only) MALE, FEMALE, or NEUTRAL.  | no |
| synthesizer.voice | voice to use.  Note that the voice list differs whether you are using aws or Google. Defaults to application setting, if provided. | no |
| loop | the number of times a text is to be repeated; 0 means repeat forever.  Defaults to 1. | no |
| earlyMedia | if true and the call has not yet been answered, play the audio without answering call.  Defaults to false | no |

<p class="flex">
<a href="/docs/webhooks/redirect">Prev: redirect</a>
<a href="/docs/webhooks/sip-decline">Next: sip:decline</a>
</p>
