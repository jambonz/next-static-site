
The `recognizer` property is used in multiple verbs (gather, transcribe, etc). It selects and configures the speech recognizer.  It is an object containing the following properties:

| option        | description | required  |
| ------------- |-------------| -----|
| vendor | Speech vendor to use (google, aws, microsoft, deepgram, nuance, or ibm) | no |
| language | Language code to use for speech detection.  Defaults to the application level setting | no |
| interim | If true, interim transcriptions are sent | no (default: false) |
| vad.enable|If true, delay connecting to cloud recognizer until speech is detected|no|
| vad.voiceMs|If vad is enabled, the number of milliseconds of speech required before connecting to cloud recognizer|no|
| vad.mode|If vad is enabled, this setting governs the sensitivity of the voice activity detector; value must be between 0 to 3 inclusive, lower numbers mean more sensitive|no|
| separateRecognitionPerChannel | If true, recognize both caller and called party speech using separate recognition sessions | no |
| altLanguages |(google/microsoft only) An array of alternative languages that the speaker may be using | no |
| punctuation |(google only) Enable automatic punctuation | no |
| enhancedModel |(google only) Use enhanced model | no |
| words |(google only) Enable word offsets | no |
| diarization |(google only) Enable speaker diarization | no |
| diarizationMinSpeakers |(google only) Set the minimum speaker count | no |
| diarizationMaxSpeakers |(google only) Set the maximum speaker count | no |
| interactionType |(google only) Set the interaction type: discussion, presentation, phone_call, voicemail, professionally_produced, voice_search, voice_command, dictation | no |
| naicsCode |(google only) set an industry [NAICS](https://www.census.gov/naics/?58967?yearbck=2022) code that is relevant to the speech  | no |
| hints | (google and microsoft only) Array of words or phrases to assist speech detection | no |
| hintsBoost | (google only) Number indicating the strength to assign to the configured hints | no |
| profanityFilter | (google only) If true, filter profanity from speech transcription .  Default:  no| no |
| vocabularyName |  (aws only) The name of a vocabulary to use when processing the speech.| no |
| vocabularyFilterName |  (aws only) The name of a vocabulary filter to use when processing the speech.| no |
| filterMethod |  (aws only) The method to use when filtering the speech: remove, mask, or tag.| no |
| identifyChannels |  (aws only) Enable channel identification. | no |
| profanityOption | (microsoft only) masked, removed, or raw.  Default:  raw| no |
| outputFormat | (microsoft only) simple or detailed.  Default:  simple| no |
| requestSnr | (microsoft only) Request signal to noise information| no |
| initialSpeechTimeoutMs | (microsoft only) Initial speech timeout in milliseconds| no |
| transcriptionHook | Webhook to receive an HTPP POST when an interim or final transcription is received. | yes |
| asrTimeout|timeout value for [continuous ASR feature](/docs/supporting-articles/continuous-asr)| no |
| asrDtmfTerminationDigit|DMTF key that terminates [continuous ASR feature](/docs/supporting-articles/continuous-asr)| no |
| nuanceOptions|Nuance-specific speech recognition options (see below)| no |
| deepgramOptions|Deepgram-specific speech recognition options (see below)| no |
| ibmOptions|IBM Watson-specific speech recognition options (see below)| no |

<h2 id="nuanceOptions">nuanceOptions</h2>

`nuanceOptions` is an object with the following properties. Please refer to the [Nuance Documentation](https://docs.mix.nuance.com/asr-grpc/v1/#recognitionparameters) for detailed descriptions.

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
|resource|An array of zero or more [recognition resources](https://docs.mix.nuance.com/asr-grpc/v1/#recognitionresource) (domain LMs, wordsets, etc.) to improve recognition|no|
| resource[].inlineWordset | Inline wordset JSON resource. See [Wordsets](https://docs.mix.nuance.com/asr-grpc/v1/#wordsets) for the format| no |
| resource[].builtin | Name of a builtin resource in the data pack| no |
| resource[].inlineGrammar | Inline grammar, SRGS XML format| no |
| resource[].wakeupWord | Array of [wakeup words](https://docs.mix.nuance.com/asr-grpc/v1/#wakeup-words)| no |
| resource[].weightName | input field setting the [weight](https://docs.mix.nuance.com/asr-grpc/v1/#enumresourcetype) of the domain LM or builtin relative to the data pack ('defaultWeight', 'lowest', 'low', 'medium', 'high', 'highest')| no (default = MEDIUM|
| resource[].weightValue | Weight of DLM or builtin as a numeric value from 0 to 1| no (default: 0.25)|
| resource[].reuse | Whether the resource will be [used multiple times](https://docs.mix.nuance.com/asr-grpc/v1/#enumresourcereuse) ('undefined_reuse', 'low_reuse','high_reuse')| no (default: low_reuse|
| resource[].externalReference|[An external DLM or settings file](https://docs.mix.nuance.com/asr-grpc/v1/#resourcereference) for creating or updating a speaker profile| no|
| resource[].externalReference.type | Resource type ('undefined_resource_type', 'wordset', 'compiled_wordset', 'domain_lm', 'speaker_profile', 'grammar', 'settings') | no |
| resource[].externalReference.uri | Location of the resource as a URN reference| no |
| resource[].externalReference.maxLoadFailures | when true allow transcription to proceed resource loading fails| no |
|  resource[].externalReference.requestTimeoutMs | Time to wait when downloading resources| no |
|  resource[].externalReference.headers | An object containing HTTP cache-control directives (e.g. max-age etc) | no |

<h2 id="deepgramOptions">deepgramOptions</h2>

`deepgramOptions` is an object with the following properties. Please refer to the [Deepgram Documentation](https://developers.deepgram.com/api-reference/transcription/#transcribe-live-streaming-audio) for detailed descriptions.

| option        | description | required  |
| ------------- |-------------| -----|
| apiKey | Deepgram api key to authenticate with (overrides setting in jambonz portal) | no |
| tier | Level of model you would like to use ('enhanced', 'base')  | no (default: base) |
| model | AI model used to process submitted audio ('general', 'meeting', 'phonecall', 'voicemail', 'finance', 'conversationalai', 'video', 'custom')  | no (default: general) |
| customModel | Id of custom model  | no |
| version | version of model to use  | no (default: latest)|
| punctuate | Indicates whether to add punctuation and capitalization to the transcript  | no |
| [profanityFilter](https://developers.deepgram.com/documentation/features/profanity-filter/) | Indicates whether to remove profanity from the transcript  | no |
| [redact](https://developers.deepgram.com/documentation/features/redact/) | Whether to redact information from transcripts ('pci', 'numbers', 'true', 'ssn')  | no |
| diarize | Wehther to assign a speaker to each word in the transcript  | no |
| diarizeVersion | if set to '2021-07-14.0' the legacy diarization feature will be used  | no |
| multichannel | Indicates whether to transcribe each audio channel independently  | no |
| alternatives | Number of alternative transcripts to return  | no |
| numerals | Indicates whether to convert numbers from written format (e.g., one) to numerical format (e.g., 1)  | no |
| search | An array of terms or phrases to search for in the submitted audio| no |
| replace | An array of terms or phrases to search for in the submitted audio and replace  | no |
| [keywords](https://developers.deepgram.com/documentation/features/keywords/) | An array keywords to which the model should pay particular attention to boosting or suppressing to help it understand context  | no |
| endpointing | Indicates whether Deepgram will detect whether a speaker has finished speaking  | no (default: true) |
| tag | A tag to associate with the request.  Tags appear in usage reports | no |
| apiKey | Deepgram  | no |

<h2 id="ibmOptions">ibmOptions</h2>

`ibmOptions` is an object with the following properties. Please refer to the [IBM Watson Documentation](https://cloud.ibm.com/apidocs/speech-to-text?code=node#recognize) for detailed descriptions.

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