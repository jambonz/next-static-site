# recognizer

The `recognizer` property is used in multiple verbs ([gather](/docs/webhooks/gather), [transcribe](/docs/webhooks/transcribe), [dial](/docs/webhooks/dial)). It selects and configures the speech recognizer.  

It is an object containing the following properties:

| option        | description | required  |
| ------------- |-------------| -----|
| vendor | Speech vendor to use (see list below, along with any others you add via the [custom speech API](/docs/speech-api/overview/)) | no |
| language | Language code to use for speech detection.  Defaults to the application level setting | no |
| fallbackVendor | Fallback Speech vendor to use (see list below, along with any others you add via the [custom speech API](/docs/speech-api/overview/)) | no |
| fallbackLanguage | Fallback Language code to use for speech detection.  Defaults to the application level setting | no |
| interim | If true, interim transcriptions are sent | no (default: false) |
| hints | (google, microsoft, deepgram, nvidia, soniox) Array of words or phrases to assist speech detection.  See [examples](#hints) below. | no |
| hintsBoost | (google, nvidia) Number indicating the strength to assign to the configured hints.  See examples below. | no |
| profanityFilter | (google, deepgram, nuance, nvidia) If true, filter profanity from speech transcription .  Default:  no| no |
| singleUtterance | (google) If true, return only a single utterance/transcript | no (default: true for gather)|
| vad.enable|If true, delay connecting to cloud recognizer until speech is detected|no|
| vad.voiceMs|If vad is enabled, the number of milliseconds of speech required before connecting to cloud recognizer|no|
| vad.mode|If vad is enabled, this setting governs the sensitivity of the voice activity detector; value must be between 0 to 3 inclusive, lower numbers mean more sensitive|no|
| separateRecognitionPerChannel | If true, recognize both caller and called party speech using separate recognition sessions | no |
| altLanguages |(google, microsoft) An array of alternative languages that the speaker may be using | no |
| punctuation |(google) Enable automatic punctuation | no |
| model |(google) speech recognition model to use | no (default: phone_call) |
| enhancedModel |(google) Use enhanced model | no |
| words |(google) Enable word offsets | no |
| diarization |(google) Enable speaker diarization | no |
| diarizationMinSpeakers |(google) Set the minimum speaker count | no |
| diarizationMaxSpeakers |(google) Set the maximum speaker count | no |
| interactionType |(google) Set the interaction type: discussion, presentation, phone_call, voicemail, professionally_produced, voice_search, voice_command, dictation | no |
| naicsCode |(google) set an industry [NAICS](https://www.census.gov/naics/?58967?yearbck=2022) code that is relevant to the speech  | no |
| vocabularyName |  (aws) The name of a vocabulary to use when processing the speech.| no |
| vocabularyFilterName |  (aws) The name of a vocabulary filter to use when processing the speech.| no |
| filterMethod |  (aws) The method to use when filtering the speech: remove, mask, or tag.| no |
| languageModelName |  (aws) The name of the custom language model when processing speech.| no |
| identifyChannels |  (aws) Enable channel identification. | no |
| profanityOption | (microsoft) masked, removed, or raw.  Default:  raw| no |
| outputFormat | (microsoft) simple or detailed.  Default:  simple| no |
| requestSnr | (microsoft) Request signal to noise information| no |
| initialSpeechTimeoutMs | (microsoft) Initial speech timeout in milliseconds| no |
| minConfidence | If provided, final transcripts with confidence less than this value return a reason of 'stt-low-confidence' in webhook | no |
| transcriptionHook | Webhook to receive an HTPP POST when an interim or final transcription is received. | yes |
| asrTimeout|timeout value for [continuous ASR feature](/docs/supporting-articles/continuous-asr)| no |
| asrDtmfTerminationDigit|DMTF key that terminates [continuous ASR feature](/docs/supporting-articles/continuous-asr)| no |
| azureServiceEndpoint | Custom service endpoint to connect to, instead of hosted Microsoft regional endpoints | no |
| [azureOptions](#azureOptions) (added in 0.8.5) | Azure-specific speech recognition options (see below) | no |
| [deepgramOptions](#deepgramOptions) (added in 0.8.0)|Deepgram-specific speech recognition options (see below)| no |
| [ibmOptions](#ibmOptions) (added in 0.8.0)|IBM Watson-specific speech recognition options (see below)| no |
| [nuanceOptions](#nuanceOptions) (added in 0.8.0)|Nuance-specific speech recognition options (see below)| no |
| [nvidiaOptions](#nvidiaOptions) (added in 0.8.0)|Nvidia-specific speech recognition options (see below)| no |
| [sonioxOptions](#sonioxOptions) (added in 0.8.2)|Soniox-specific speech recognition options (see below)| no |

## Speech-to-text vendors
jambonz natively supports the following speech-to-text services:
- assemblyai
- aws
- azure
- cobalt
- deepgram
- google
- ibm
- nuance
- nvidia
- sonoix

Note: Microsoft supports [on-prem and private link options](/docs/supporting-articles/azure-private-link) for deploying the speech service in addition to the hosted Microsoft service.

<h2 id="hints">Providing speech hints</h2>

google, microsoft, deepgram, and nvidia all support the ability to provide a dynamic list of words or phrases that should be "boosted" by the recognizer, i.e. the recognizer should be more likely to detect this terms and return them in the transcript.  A boost factor can also be applied.  In the most basic implementation it would look like this:

```json
"hints": ["benign", "malignant", "biopsy"],
"hintsBoost": 50
```

Additionally, google and nvidia allow a boost factor to be specified at the phrase level, e.g.

```json
"hints": [
  {"phrase": "benign", "boost": 50},
  {"phrase": "malignant", "boost": 10},
  {"phrase": "biopsy", "boost": 20},
]
```

<h2 id="azureOptions">azureOptions</h2>

`azureOptions` is an object with the following properties. This option is available in jambonz 0.8.5 or above.

| option        | description | required  |
| ------------- |-------------| -----|
| speechSegmentationSilenceTimeoutMs | Duration (in ms) of nonspeech audio within a phrase that's currently being spoken before that phrase is considered "done." See [here](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech?pivots=programming-language-csharp#change-how-silence-is-handled) for details| no |


<h2 id="nuanceOptions">nuanceOptions</h2>

`nuanceOptions` is an object with the following properties. Please refer to the [Nuance Documentation](https://docs.nuance.com/mix/apis/asr-grpc/v1/#recognitionparameters) for detailed descriptions.  This option is available in jambonz 0.8.0 or above.

| option        | description | required  |
| ------------- |-------------| -----|
| clientId | Nuance client ID to authenticate with (overrides setting in jambonz portal) | no |
| secret | Nuance secret to authenticate with (overrides setting in jambonz portal) | no |
| kryptonEndpoint | Endpoint of on-prem Krypton endpoint to connect to | no (defaults to hosted service) |
| topic | specialized language model | no |
| utteranceDetectionMode | How many sentences (utterances) within the audio stream are processed ('single', 'multiple', 'disabled')| no (default: single|
| punctuation | Whether to enable auto punctuation | no |
| includeTokenization | Whether to include tokenized recognition result. | no |
| discardSpeakerAdaptation | If speaker profiles are used, whether to discard updated speaker data. By default, data is stored.| no |
| suppressCallRecording | Whether to disable call logging and audio capture. By default, call logs, audio, and metadata are collected. | no |
| maskLoadFailures | whether to terminate recogition when failing to load external resources | no |
| suppressInitialCapitalization | When true, the first word in a sentence is not automatically capitalized. | no |
| allowZeroBaseLmWeight | When true, custom resources (DLMs, wordsets, etc.) can use the entire | no |
| filterWakeupWord | Whether to remove the wakeup word from the final result. | no |
| resultType | The level of recognition results ('final', 'partial', 'immutable_partial')| no (default: final) |
| noInputTimeoutMs | Maximum silence, in milliseconds, allowed while waiting for user input after recognition timers are started. | no |
| recognitionTimeoutMs | Maximum duration, in milliseconds, of recognition turn | no |
| utteranceEndSilenceMs | Minimum silence, in milliseconds, that determines the end of a sentence| no |
| maxHypotheses | Maximum number of n-best hypotheses to return | no |
| speechDomain | Mapping to internal weight sets for language models in the data pack | no |
| userId | Identifies a specific user within the application | no |
| speechDetectionSensitivity | A balance between detecting speech and noise (breathing, etc.), 0 to 1. 0 means ignore all noise, 1 means interpret all noise as speech| no (default: 0.5) |
| clientData | An object containing arbitrary key, value pairs to inject into the call log.| no |
| formatting.scheme | Keyword for a formatting type defined in the data pack| no |
| formatting.options | Object containing key, value pairs of formatting options and values defined in the data pack| no |
|resource|An array of zero or more [recognition resources](https://docs.nuance.com/mix/apis/asr-grpc/v1/api/nuance-asr/#recognitionresource) (domain LMs, wordsets, etc.) to improve recognition|no|
| resource[].inlineWordset | Inline wordset JSON resource. See [Wordsets](https://docs.nuance.com/mix/apis/asr-grpc/v1/ref-topics/resources-asr/wordsets-asr/) for details| no |
| resource[].builtin | Name of a builtin resource in the data pack| no |
| resource[].inlineGrammar | Inline grammar, SRGS XML format| no |
| resource[].wakeupWord | Array of [wakeup words](https://docs.nuance.com/mix/apis/asr-grpc/v1/api/nuance-asr/#wakeupword)| no |
| resource[].weightName | input field setting the [weight](https://docs.nuance.com/mix/apis/asr-grpc/v1/api/nuance-asr/#enumweight) of the domain LM or builtin relative to the data pack ('defaultWeight', 'lowest', 'low', 'medium', 'high', 'highest')| no (default = MEDIUM|
| resource[].weightValue | Weight of DLM or builtin as a numeric value from 0 to 1| no (default: 0.25)|
| resource[].reuse | Whether the resource will be [used multiple times](https://docs.nuance.com/mix/apis/asr-grpc/v1/api/nuance-asr/#enumresourcereuse) ('undefined_reuse', 'low_reuse','high_reuse')| no (default: low_reuse|
| resource[].externalReference|[An external DLM or settings file](https://docs.nuance.com/mix/apis/asr-grpc/v1/api/nuance-asr/#resourcereference) for creating or updating a speaker profile| no|
| resource[].externalReference.type | Resource type ('undefined_resource_type', 'wordset', 'compiled_wordset', 'domain_lm', 'speaker_profile', 'grammar', 'settings') | no |
| resource[].externalReference.uri | Location of the resource as a URN reference| no |
| resource[].externalReference.maxLoadFailures | when true allow transcription to proceed resource loading fails| no |
|  resource[].externalReference.requestTimeoutMs | Time to wait when downloading resources| no |
|  resource[].externalReference.headers | An object containing HTTP cache-control directives (e.g. max-age etc) | no |

<h2 id="deepgramOptions">deepgramOptions</h2>

`deepgramOptions` is an object with the following properties. Please refer to the [Deepgram Documentation](https://developers.deepgram.com/api-reference/transcription/#transcribe-live-streaming-audio) for detailed descriptions. This option is available in jambonz 0.8.0 or above.

| option        | description | required  |
| ------------- |-------------| -----|
| apiKey | Deepgram api key to authenticate with (overrides setting in jambonz portal) | no |
| [tier](https://developers.deepgram.com/docs/tier) | Deepgram tier you would like to use ('enhanced', 'base')  | no (default: base) |
| [model](https://developers.deepgram.com/docs/model) | Deepgram model used to process submitted audio ('general', 'meeting', 'phonecall', 'voicemail', 'finance', 'conversationalai', 'video', 'custom')  | no (default: general) |
| [endpointing](https://developers.deepgram.com/docs/endpointing) | Indicates the number of milliseconds of silence Deepgram will use to determine a speaker has finished saying a word or phrase. The value provided must be iether a number of milliseconds or 'false' to disable the feature entirely.  Note: the default endpointing value that Deepgram uses is 10 milliseconds.  You can set this value higher to allow to require more silence before a final transcript is returned but we suggest a value of 1000 (one second) or less, as we have observed strange behaviors with higher values.  If you wish to allow more time for pauses during a conversation before returning a transcript, we suggest using the utteranceEndMs feature instead that is described below. | no (default: 10ms) |
| customModel | Id of custom model  | no |
| [version](https://developers.deepgram.com/docs/version) | Deepgram version of model to use  | no (default: latest)|
| [punctuate](https://developers.deepgram.com/docs/punctuation) | Indicates whether to add punctuation and capitalization to the transcript  | no |
| [profanityFilter](https://developers.deepgram.com/documentation/features/profanity-filter/) | Indicates whether to remove profanity from the transcript  | no |
| [redact](https://developers.deepgram.com/documentation/features/redact/) | Whether to redact information from transcripts ('pci', 'numbers', 'true', 'ssn')  | no |
| [diarize](https://developers.deepgram.com/docs/diarization) | Wehther to assign a speaker to each word in the transcript  | no |
| diarizeVersion | if set to '2021-07-14.0' the legacy diarization feature will be used  | no |
| multichannel | Indicates whether to transcribe each audio channel independently  | no |
| alternatives | Number of alternative transcripts to return  | no |
| [numerals](https://developers.deepgram.com/docs/numerals) | Indicates whether to convert numbers from written format (e.g., one) to numerical format (e.g., 1)  | no |
| search | An array of terms or phrases to search for in the submitted audio| no |
| [replace](https://developers.deepgram.com/docs/find-and-replace) | An array of terms or phrases to search for in the submitted audio and replace  | no |
| [keywords](https://developers.deepgram.com/documentation/features/keywords/) | An array keywords to which the model should pay particular attention to boosting or suppressing to help it understand context  | no |
| [tag](https://developers.deepgram.com/docs/tagging) | A tag to associate with the request.  Tags appear in usage reports | no |
| utteranceEndMs (added in 08.5) | a number of milliseconds of silence that deepgram will wait after the last word was spoken before returning an UtteranceEnd event, which is used by jambonz to trigger the transcript webhook if this proprety is supplied.  This is essentially Deepgram's version of continous ASR (and in fact if you enable continuos ASR on Deepgram it will work by enabling this property) | no |
| shortUtterance (added in 08.5)| Causes a transcript to be returned as soon as the Deepgram is_final property is set.  This should only be used in scenarios where you are expecting a very short confirmation or directed command and you want minimal latency | no |
| [smartFormatting](https://developers.deepgram.com/docs/smart-format) (added in 08.5) | Indicates whether to enable Deepgram's Smart Formatting feature. | no |

<h2 id="ibmOptions">ibmOptions</h2>

`ibmOptions` is an object with the following properties. Please refer to the [IBM Watson Documentation](https://cloud.ibm.com/apidocs/speech-to-text?code=node#recognize) for detailed descriptions. This option is available in jambonz 0.8.0 or above.

| option        | description | required  |
| ------------- |-------------| -----|
| sttApiKey | IBM api key to authenticate with (overrides setting in jambonz portal) | no |
| sttRegion | IBM region (overrides setting in jambonz portal) | no |
| instanceId | IBM speech instance id (overrides setting in jambonz portal) | no |
| model | The model to use for speech recognition | no |
| languageCustomizationId | Id of a custom language model | no |
| acousticCustomizationId | Id of a custom acoustic model | no |
| baseModelVersion | Base model to be used | no |
| watsonMetadata | a [tag value](https://cloud.ibm.com/apidocs/speech-to-text?code=node#getting-started-data-labels) to apply to the request data provided | no |
| watsonLearningOptOut | set to true to prevent IBM from using your api request data to improve their service| no |

<h2 id="nvidiaOptions">nvidiaOptions</h2>

`nvidiaOptions` is an object with the following properties. Please refer to the [Nvidia Riva Documentation](https://docs.nvidia.com/deeplearning/riva/user-guide/docs/index.html) for detailed descriptions. This option is available in jambonz 0.8.0 or above.

| option        | description | required  |
| ------------- |-------------| -----|
| rivaUri | grcp endpoint (ip:port) that Nvidia Riva is listening on  | no |
| maxAlternatives | number of alternatives to return| no |
| profanityFilter | Indicates whether to remove profanity from the transcript  | no |
| punctuation | Indicates whether to provide puncutation in the transcripts | no |
| wordTimeOffsets | indicates whether to provide word-level detail | no |
| verbatimTranscripts | Indicates whether to provide verbatim transcripts| no |
| customConfiguration | An object of key-value pairs that can be sent to Nvidia for custom configuration | no |

<h2 id="sonioxOptions">sonioxOptions</h2>

`sonioxOptions` is an object with the following properties. Please refer to the [Soniox Documentation](https://soniox.com/docs/) for detailed descriptions. This option is available in jambonz 0.8.2 or above.

| option        | description | required  |
| ------------- |-------------| -----|
| api_key | Soniox api key  | no |
| model | Soniox [model](https://soniox.com/docs/models) to use | no (default: precision_ivr) |
| profanityFilter | Indicates whether to [remove profanity](https://soniox.com/docs/profanity_filter) from the transcript  | no |
| storage | properties that dictate whether to audio and/or transcripts.  Can be useful for debugging purposes. | no |
| storage.id | storage identifier | no |
| storage.title | storage title | no |
| storage.disableStoreAudio | if true do not store audio | no (default: false) |
| storage.disableStoreTranscript | if true do not store transcript | no (default: false)  |
| storage.disableSearch |  if true do not allow search | no (default: false)  |
