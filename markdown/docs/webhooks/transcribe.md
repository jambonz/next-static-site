# transcribe

The transcribe verb is used to send real time transcriptions of speech to a web callback.

The transcribe command is only allowed as a nested verb within a dial or listen verb.  Using transcribe in a dial command allows a long-running transcription of a phone call to be made, while nesting within a listen verb allows transcriptions of recorded messages (e.g. voicemail).

```json
{
  "verb": "transcribe",
  "transcriptionHook": "http://example.com/transcribe",
  "recognizer": {
    "vendor": "Google",
    "language" : "en-US",
    "interim": true
  }
}
```

You can use the following options in the `transcribe` command:

| option        | description | required  |
| ------------- |-------------| -----|
| recognizer.vendor | Speech vendor to use (google, aws, or microsoft) | no |
| recognizer.language | Language code to use for speech detection.  Defaults to the application level setting, or 'en-US' if not set | no |
| recognizer.interim | If true interim transcriptions are sent | no (default: false) |
| recognizer.vad.enable|If true, delay connecting to cloud recognizer until speech is detected|no|
| recognizer.vad.voiceMs|If vad is enabled, the number of milliseconds of speech required before connecting to cloud recognizer|no|
| recognizer.vad.mode|If vad is enabled, this setting governs the sensitivity of the voice activity detector; value must be between 0 to 3 inclusive, lower numbers mean more sensitive|no|
| recognizer.separateRecognitionPerChannel | If true, recognize both caller and called party speech | no |
| recognizer.altLanguages |(google/microsoft only) An array of alternative languages that the speaker may be using | no |
| recognizer.punctuation |(google only) Enable automatic punctuation | no |
| recognizer.enhancedModel |(google only) Use enhanced model | no |
| recognizer.words |(google only) Enable word offsets | no |
| recognizer.diarization |(google only) Enable speaker diarization | no |
| recognizer.diarizationMinSpeakers |(google only) Set the minimum speaker count | no |
| recognizer.diarizationMaxSpeakers |(google only) Set the maximum speaker count | no |
| recognizer.interactionType |(google only) Set the interaction type: discussion, presentation, phone_call, voicemail, professionally_produced, voice_search, voice_command, dictation | no |
| recognizer.naicsCode |(google only) set an industry [NAICS](https://www.census.gov/naics/?58967?yearbck=2022) code that is relevant to the speech  | no |
| recognizer.hints | (google and microsoft only) Array of words or phrases to assist speech detection | no |
| recognizer.hintsBoost | (google only) Number indicating the strength to assign to the configured hints | no |
| recognizer.profanityFilter | (google only) If true, filter profanity from speech transcription .  Default:  no| no |
| recognizer.vocabularyName |  (aws only) The name of a vocabulary to use when processing the speech.| no |
| recognizer.vocabularyFilterName |  (aws only) The name of a vocabulary filter to use when processing the speech.| no |
| recognizer.filterMethod |  (aws only) The method to use when filtering the speech: remove, mask, or tag.| no |
| recognizer.identifyChannels |  (aws only) Enable channel identification. | no |
| recognizer.profanityOption | (microsoft only) masked, removed, or raw.  Default:  raw| no |
| recognizer.outputFormat | (microsoft only) simple or detailed.  Default:  simple| no |
| recognizer.requestSnr | (microsoft only) Request signal to noise information| no |
| recognizer.initialSpeechTimeoutMs | (microsoft only) Initial speech timeout in milliseconds| no |
| recognizer.transcriptionHook | Webhook to receive an HTPP POST when an interim or final transcription is received. | yes |
| recognizer.asrTimeout|timeout value for [continuous ASR feature](/docs/supporting-articles/continuous-asr)| no |
| recognizer.asrDtmfTerminationDigit|DMTF key that terminates [continuous ASR feature](/docs/supporting-articles/continuous-asr)| no |


<p class="flex">
<a href="/docs/webhooks/tag">Prev: tag</a>
<span>&nbsp;</span>
</p>
