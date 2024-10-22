# llm

The `llm` verb connects a call to AI language model.  

> In release 0.9.2, OpenAI's realtime API is the only supported model.  Support for other LLMs will be rolling out shortly.

[Here is an example](https://github.com/jambonz/openai-s2s-example) showing how to connect to OpenAI Realtime API.

```js
session.llm(
{
  vendor: 'openai',
  model: "gpt-4o-realtime-preview-2024-10-01",
  auth: {
    apiKey
  },
  actionHook: '/final',
  eventHook: '/event',
  toolHook: '/toolCall',
  events: [
    'conversation.item.*',
    'response.audio_transcript.done',
    'input_audio_buffer.committed'
  ],
  llmOptions: {
    response_create: {
      modalities: ['text', 'audio'],
      instructions: 'Please assist the user with their request.',
      voice: 'alloy',
      output_audio_format: 'pcm16',
      temperature: 0.8,
      max_output_tokens: 4096,
    },
    session_update: {
      tools: [
        {
          name: 'get_weather',
          type: 'function',
          description: 'Get the weather at a given location',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: 'Location to get the weather from',
              },
              scale: {
                type: 'string',
                enum: ['fahrenheit', 'celsius'],
              },
            },
            required: ['location', 'scale'],
          },
        },
      ],
      tool_choice: 'auto',
      input_audio_transcription: {
        model: 'whisper-1',
      },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.8,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
      }
    }
  }
})
```

You can use the following options in the `llm` verb:

| option        | description | required  |
| ------------- |-------------| -----|
| vendor | name of the LLM vendor | yes |
| model | name of the LLM mode | yes |
| auth | object containing authentication credentials; format according to the model (see below) | no |
| connectOptions | object containing information such as URI to connect to | no |
| actionHook | webhook that will be called when the LLM session ends | no |
| eventHook | webhook that will be called when a requested LLM event happens (e.g. transcript) | no |
| toolHook | webhook that will be called when the LLM wants to call a function | no |
| events | array of event names listing the events requested (wildcards allowed) | no |
| llmOptions | object containing instructions for the LLM; format depdendent on the LLM model | no |


<p class="flex">
<a href="/docs/webhooks/listen">Prev: leave</a>
<a href="/docs/webhooks/message">Next: listen</a>
</p>
