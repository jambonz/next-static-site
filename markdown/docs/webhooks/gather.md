# gather

The `gather` command is used to collect dtmf or speech input.

```json
{
  "verb": "gather",
  "actionHook": "http://example.com/collect",
  "input": ["digits", "speech"],
  "bargein": true,
  "dtmfBargein": true,
  "finishOnKey": "#",
  "numDigits": 5,
  "timeout": 8,
  "recognizer": {
    "vendor": "Google",
    "language": "en-US",
    "hints": ["sales", "support"],
    "hintsBoost": 10
  },
  "say": {
    "text": "To speak to Sales press 1 or say Sales.  To speak to customer support press 2 or say Support",
    "synthesizer": {
      "vendor": "Google",
      "language": "en-US"
    }
  }
}
```

You can use the following options in the `gather` command:

| option        | description | required  |
| ------------- |-------------| -----|
| actionHook | Webhook POST to invoke with the collected digits or speech. The payload will include a 'speech' or 'dtmf' property along with the standard attributes.  See below for more detail.| yes |
| bargein | allow speech bargein, i.e. kill audio playback if caller begins speaking | no |
| dtmfBargein | allow dtmf bargein, i.e. kill audio playback if caller enters dtmf | no |
| finishOnKey | Dmtf key that signals the end of input | no |
| input |Array, specifying allowed types of input: ['digits'], ['speech'], or ['digits', 'speech'].  Default: ['digits'] | no |
| interDigitTimeout | Amount of time to wait between digits after minDigits have been entered.| no |
|listenDuringPrompt| if false, do not listen for user speech until say or play has completed.  Defaults to true|no|
| minBargeinWordCount | if bargein is true, only kill speech when this many words are spoken.  Defaults to 1 | no|
| minDigits | Minimum number of dtmf digits expected to gather.  Defaults to 1. | no |
| maxDigits | Maximum number of dtmf digits expected to gather | no |
| numDigits | Exact number of dtmf digits expected to gather | no |
| partialResultHook | Webhook to send interim transcription results to. Partial transcriptions are only generated if this property is set. | no |
| play | nested [play](#play) Command that can be used to prompt the user | no |
| recognizer.vendor | Speech vendor to use (google, aws, or microsoft) | no |
| recognizer.language | Language code to use for speech detection.  Defaults to the application level setting| no |
| recognizer.vad.enable|If true, delay connecting to cloud recognizer until speech is detected|no|
| recognizer.vad.voiceMs|If vad is enabled, the number of milliseconds of speech required before connecting to cloud recognizer|no|
| recognizer.vad.mode|If vad is enabled, this setting governs the sensitivity of the voice activity detector; value must be between 0 to 3 inclusive (lower numbers mean more sensitivity, i.e. more likely to return a false positive). Default: 2|no|
| recognizer.hints | (google and microsoft only) Array of words or phrases to assist speech detection | no |
| recognizer.hintsBoost | (google only) A value between 0 to 20 inclusive; higher number means assign more weight to the hints | no |
| recognizer.altLanguages |(google only) An array of alternative languages that the speaker may be using | no |
| recognizer.profanityFilter | (google only) If true, filter profanity from speech transcription .  Default:  no| no |
| recognizer.vocabularyName |  (aws only) The name of a vocabulary to use when processing the speech.| no |
| recognizer.vocabularyFilterName |  (aws only) The name of a vocabulary filter to use when processing the speech.| no |
| recognizer.filterMethod |  (aws only) The method to use when filtering the speech: remove, mask, or tag.| no |
| recognizer.profanityOption | (microsoft only) masked, removed, or raw.  Default:  raw| no |
| recognizer.outputFormat | (microsoft only) simple or detailed.  Default:  simple| no |
| recognizer.requestSnr | (microsoft only) Request signal to noise information| no |
| recognizer.initialSpeechTimeoutMs | (microsoft only) Initial speech timeout in milliseconds| no |
| recognizer.azureServiceEndpoint | (microsoft only) URI of a custom speech endpoint to connect to| no |
| say | nested [say](#say) Command that can be used to prompt the user | no |
| timeout | The number of seconds of silence or inaction that denote the end of caller input.  The timeout timer will begin after any nested play or say command completes.  Defaults to 5 | no |

In the case of speech input, the actionHook payload will include a `speech` object with the response from Google speech:
```json
"speech": {
			"stability": 0,
			"is_final": true,
			"alternatives": [{
				"confidence": 0.858155,
				"transcript": "sales please"
			}]
		}
```

In the case of digits input, the payload will simple include a `digits` property indicating the dtmf keys pressed:
```json
"digits": "0276"
```

**Note**: an HTTP POST will be used for both the `action` and the `partialResultCallback` since the body may need to contain nested JSON objects for speech details.

Note: the `partialResultCallback` web callback should not return content; any returned content will be discarded.

<p class="flex">
<a href="/docs/webhooks/enqueue">Prev: enqueue</a>
<a href="/docs/webhooks/hangup">Next: hangup</a>
</p>
