# Text-to-speech API
> Added in 0.8.2

jambonz provides native support for lots of speech recognition vendors, but if you want to integrate with a vendor we don't yet support you can easily do this by writing to our API.  

The TTS API is a simple http-based api.  

jambonz sends an HTTP POST containing the text to be synthesized and associated properties such as language and voice.  Your server is responsible for implementing the interface to your chosen speech vendor and returning an mp3 file containing the audio.  

Easy-peasy!

## Authentication

An Authorization header is sent by jambonz on the HTTP request.  The Authorization header contains an api key, e.g.

```js
Authorization: Bearer <apiKey>
```

When you create a custom speech vendor in the jambonz portal you will specify an api key which is then then provided in the Authorization header whenever that custom speech vendor is used in yourj application.

## Request body attributes

| property | type | description  |
| ---------|-------------| -----|
| language | String | ISO language code (e.g. "en-US") |
| voice | String | Name of voice to use |
| type | String | "text" or "ssml"|
| text | String | text to be synthesized (if type=ssml should be enclosed in <speak> tags) |

## Response body attributes

Your server should return a 200 OK containing a body with the synthesized speech in case of success, or an HTTP error code in case of a failure.  The format of the returned audio must be indicated in the Content-Type header; the following values are allowed:

- audio/mpeg (or audio/mp3) - the content should be mp3 audio (this is the preferred format to return)
- audio/wav (or audio/x-wav) - the content should be linear PCM audio with a wave header
- audio/l16;rate=8000 - the content should be linear16 audio with 8khz sampling
- audio/l16;rate=16000 - the content should be linear16 audio with 16khz sampling
- audio/l16;rate=24000 - the content should be linear16 audio with 24khz sampling
- audio/l16;rate=32000 - the content should be linear16 audio with 32khz sampling
- audio/l16;rate=48000 - the content should be linear16 audio with 48khz sampling
